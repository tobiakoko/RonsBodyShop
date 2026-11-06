// @vitest-environment node
import { handleLead } from './lead';

const send = vi.fn();
vi.mock('resend', () => ({
  Resend: class {
    emails = { send };
  },
}));

const message = {
  name: 'Al',
  contact: 'al@example.com',
  message: 'Hello',
  consent: true,
  company: '',
};
const post = (body: unknown) =>
  handleLead(new Request('http://x/api/lead', { method: 'POST', body: JSON.stringify(body) }));

describe('POST /api/lead', () => {
  beforeEach(() => {
    send.mockReset().mockResolvedValue({ data: { id: '1' }, error: null });
    process.env.RESEND_API_KEY = 'test';
    delete process.env.TURNSTILE_SECRET_KEY;
  });

  it('emails the shop and returns a reference', async () => {
    const res = await post({ kind: 'message', data: message });
    expect(res.status).toBe(200);
    const { reference } = await res.json();
    expect(reference).toMatch(/^RBS-\d{6}$/);
    expect(send).toHaveBeenCalledTimes(1);
    const email = send.mock.calls[0][0];
    expect(email.to).toEqual(['ronsbodyshop@sbcglobal.net']);
    expect(email.subject).toContain(reference);
    expect(email.replyTo).toBe('al@example.com');
  });

  it('rejects invalid data without sending', async () => {
    const res = await post({ kind: 'message', data: { ...message, consent: false } });
    expect(res.status).toBe(400);
    expect(send).not.toHaveBeenCalled();
  });

  it('fakes success for honeypot hits and sends nothing', async () => {
    const res = await post({ kind: 'message', data: { ...message, company: 'bot' } });
    expect(res.status).toBe(200);
    expect(send).not.toHaveBeenCalled();
  });

  it('strips line breaks from user input used in the subject', async () => {
    await post({ kind: 'message', data: { ...message, name: 'Al\r\nBcc: evil@x.com' } });
    expect(send.mock.calls[0][0].subject).not.toMatch(/[\r\n]/);
  });

  it('reports failure when Resend returns an error', async () => {
    send.mockResolvedValue({ data: null, error: { message: 'bad' } });
    const res = await post({ kind: 'message', data: message });
    expect(res.status).toBe(502);
  });

  it('returns 500 when the API key is missing', async () => {
    delete process.env.RESEND_API_KEY;
    expect((await post({ kind: 'message', data: message })).status).toBe(500);
  });

  it('rejects non-POST', async () => {
    const res = await handleLead(new Request('http://x/api/lead', { method: 'GET' }));
    expect(res.status).toBe(405);
  });

  it('requires a Turnstile token when the secret is configured', async () => {
    process.env.TURNSTILE_SECRET_KEY = 'secret';
    const res = await post({ kind: 'message', data: message });
    expect(res.status).toBe(400);
    expect(send).not.toHaveBeenCalled();
  });
});
