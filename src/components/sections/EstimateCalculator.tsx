import React, { useState } from 'react';
import { Camera, Check, Phone, ArrowRight, Shield, CheckCircle2 } from 'lucide-react';
import { SHOP_INFO, INSURANCE_PARTNERS } from '../../content/shop';

interface EstimateCalculatorProps {
  isOpen?: boolean;
  onClose?: () => void;
  isModal?: boolean;
}

export const EstimateCalculator: React.FC<EstimateCalculatorProps> = ({ 
  isOpen = true, 
  onClose,
  isModal = false 
}) => {
  const [step, setStep] = useState<number>(1);
  const [damageType, setDamageType] = useState<string>('collision');
  const [vehicleMake, setVehicleMake] = useState<string>('Mercedes-Benz');
  const [vehicleModel, setVehicleModel] = useState<string>('');
  const [vehicleYear, setVehicleYear] = useState<string>('2021');
  const [paymentType, setPaymentType] = useState<'insurance' | 'out-of-pocket'>('insurance');
  const [insuranceCarrier, setInsuranceCarrier] = useState<string>('AAA Auto Club');
  const [claimNumber, setClaimNumber] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [photosUploaded, setPhotosUploaded] = useState<string[]>([]);
  const [contactName, setContactName] = useState<string>('');
  const [contactPhone, setContactPhone] = useState<string>('');
  const [contactEmail, setContactEmail] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [ticketNumber, setTicketNumber] = useState<string>('');

  const damageOptions = [
    { id: 'collision', label: 'Collision & Body Damage', desc: 'Fender, bumper, door, or structural impact' },
    { id: 'paint', label: 'Custom Paint & Scratch', desc: 'Down-draft refinishing & spot color match' },
    { id: 'dent', label: 'Paintless Dent Repair (PDR)', desc: 'Hail, door dings & minor metal creases' },
    { id: 'frame', label: 'Frame Alignment & Pull', desc: 'Laser chassis measurement & pull' },
    { id: 'classic', label: 'Classic Car Restoration', desc: 'Vintage fabrication & custom project' }
  ];

  const popularMakes = ['Mercedes-Benz', 'BMW', 'Lexus', 'Porsche', 'Chevrolet', 'Ford', 'Toyota', 'Classic / Custom'];

  const handleFakePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const fakeUrl = URL.createObjectURL(e.target.files[0]);
      setPhotosUploaded(prev => [...prev, fakeUrl]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const randomTicket = 'RBS-' + Math.floor(100000 + Math.random() * 900000);
    setTicketNumber(randomTicket);
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setStep(1);
    setContactName('');
    setContactPhone('');
    setContactEmail('');
    setNotes('');
  };

  const content = (
    <div className="bg-white rounded-xl border border-slate-200 shadow-xl overflow-hidden">
      {/* Header banner */}
      <div className="bg-[#16203B] text-white p-5 sm:p-6 border-b-2 border-[#E7A622]">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#E7A622]">
              Instant Online Consultation
            </span>
            <h3 className="font-['Oswald'] text-2xl sm:text-3xl uppercase font-bold text-white mt-0.5">
              Request Your Free Photo Estimate
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              Takes under 2 minutes. Receive an itemized preliminary assessment from Ron and our master estimators.
            </p>
          </div>
          {isModal && onClose && (
            <button 
              onClick={onClose}
              className="text-slate-400 hover:text-white p-2 rounded-md transition-colors"
            >
              ✕
            </button>
          )}
        </div>

        {/* Step Indicator */}
        {!isSubmitted && (
          <div className="mt-5 grid grid-cols-4 gap-2 text-xs font-semibold">
            <div className={`pb-1.5 border-b-2 transition-colors ${step >= 1 ? 'border-[#E7A622] text-[#E7A622]' : 'border-slate-700 text-slate-400'}`}>
              1. Damage
            </div>
            <div className={`pb-1.5 border-b-2 transition-colors ${step >= 2 ? 'border-[#E7A622] text-[#E7A622]' : 'border-slate-700 text-slate-400'}`}>
              2. Vehicle
            </div>
            <div className={`pb-1.5 border-b-2 transition-colors ${step >= 3 ? 'border-[#E7A622] text-[#E7A622]' : 'border-slate-700 text-slate-400'}`}>
              3. Insurance
            </div>
            <div className={`pb-1.5 border-b-2 transition-colors ${step >= 4 ? 'border-[#E7A622] text-[#E7A622]' : 'border-slate-700 text-slate-400'}`}>
              4. Contact
            </div>
          </div>
        )}
      </div>

      <div className="p-5 sm:p-8">
        {isSubmitted ? (
          <div className="text-center py-8 space-y-4 max-w-lg mx-auto">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-2">
              <Check className="w-8 h-8 stroke-[2.5]" />
            </div>
            <span className="text-xs uppercase font-bold tracking-widest text-[#16203B]">
              Estimate Request Received
            </span>
            <h4 className="font-['Oswald'] text-3xl font-bold uppercase text-slate-900">
              Reference #{ticketNumber}
            </h4>
            <p className="text-sm text-slate-600 leading-relaxed">
              Thank you, <strong className="text-slate-900">{contactName || 'Valued Customer'}</strong>. Our master estimator is reviewing your {vehicleYear} {vehicleMake} specifications. We will contact you at <strong className="text-slate-900">{contactPhone || '(Your phone)'}</strong> within 1–2 business hours.
            </p>

            <div className="p-4 bg-[#FAF7F2] border border-amber-200/80 rounded-lg text-left text-xs space-y-2 text-slate-700">
              <div className="font-semibold text-[#16203B] flex items-center gap-1.5">
                <Shield className="w-4 h-4 text-[#E7A622]" />
                Next Steps with Ron's Body Shop:
              </div>
              <ul className="list-disc pl-4 space-y-1 text-slate-600">
                <li>We review photos and compile OEM parts vs. repair labor hours.</li>
                <li>If using insurance, we handle adjuster communication and supplemental filings directly.</li>
                <li>Drop-in vehicle drop-offs welcome Monday–Friday 8:00 AM – 5:30 PM.</li>
              </ul>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href={`tel:${SHOP_INFO.phoneRaw}`}
                className="w-full sm:w-auto px-5 py-2.5 bg-[#16203B] text-white font-semibold rounded-md text-sm flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4 text-[#E7A622]" />
                <span>Call Shop Directly: {SHOP_INFO.phone}</span>
              </a>
              <button
                onClick={handleReset}
                className="w-full sm:w-auto px-4 py-2.5 border border-slate-300 text-slate-700 font-medium rounded-md text-sm hover:bg-slate-50"
              >
                Submit Another Request
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Step 1: Select Damage */}
            {step === 1 && (
              <div className="space-y-4 animate-in fade-in duration-200">
                <label className="block text-sm font-bold text-slate-900 uppercase tracking-wide">
                  Select Type of Damage or Project
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {damageOptions.map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setDamageType(opt.id)}
                      className={`text-left p-4 rounded-lg border transition-all ${
                        damageType === opt.id
                          ? 'border-[#16203B] bg-slate-50 ring-2 ring-[#E7A622]'
                          : 'border-slate-200 hover:border-slate-300 bg-white'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-900 text-sm">{opt.label}</span>
                        {damageType === opt.id && (
                          <span className="w-5 h-5 rounded-full bg-[#16203B] text-[#E7A622] flex items-center justify-center text-xs">
                            ✓
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-500 mt-1">{opt.desc}</p>
                    </button>
                  ))}
                </div>

                <div className="pt-4 flex justify-end">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="px-6 py-2.5 bg-[#16203B] text-white font-bold text-sm uppercase tracking-wide rounded-md hover:bg-[#0F1626] transition-colors flex items-center gap-2"
                  >
                    <span>Next: Vehicle Specs</span>
                    <ArrowRight className="w-4 h-4 text-[#E7A622]" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Vehicle Specs */}
            {step === 2 && (
              <div className="space-y-5 animate-in fade-in duration-200">
                <div>
                  <label className="block text-sm font-bold text-slate-900 uppercase tracking-wide mb-2">
                    Vehicle Make
                  </label>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {popularMakes.map((make) => (
                      <button
                        key={make}
                        type="button"
                        onClick={() => setVehicleMake(make)}
                        className={`px-3 py-1.5 text-xs font-semibold rounded-md border transition-colors ${
                          vehicleMake === make
                            ? 'bg-[#16203B] text-white border-[#16203B]'
                            : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
                        }`}
                      >
                        {make}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                      Model / Trim
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. C300, M3, RX350, Mustang, C10"
                      value={vehicleModel}
                      onChange={(e) => setVehicleModel(e.target.value)}
                      className="w-full px-3.5 py-2.5 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#16203B]"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                      Year
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 2022 or 1967"
                      value={vehicleYear}
                      onChange={(e) => setVehicleYear(e.target.value)}
                      className="w-full px-3.5 py-2.5 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#16203B]"
                      required
                    />
                  </div>
                </div>

                <div className="flex justify-between pt-4">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="px-5 py-2 border border-slate-300 text-slate-700 text-sm font-medium rounded-md hover:bg-slate-50"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="px-6 py-2.5 bg-[#16203B] text-white font-bold text-sm uppercase tracking-wide rounded-md hover:bg-[#0F1626] transition-colors flex items-center gap-2"
                  >
                    <span>Next: Insurance / Billing</span>
                    <ArrowRight className="w-4 h-4 text-[#E7A622]" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Insurance & Claim info */}
            {step === 3 && (
              <div className="space-y-5 animate-in fade-in duration-200">
                <div>
                  <label className="block text-sm font-bold text-slate-900 uppercase tracking-wide mb-2">
                    How Will This Repair Be Handled?
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setPaymentType('insurance')}
                      className={`p-3.5 rounded-lg border text-left transition-all ${
                        paymentType === 'insurance'
                          ? 'border-[#16203B] bg-slate-50 ring-2 ring-[#E7A622]'
                          : 'border-slate-200 bg-white'
                      }`}
                    >
                      <div className="font-bold text-slate-900 text-sm">Insurance Claim</div>
                      <div className="text-xs text-slate-500 mt-0.5">We coordinate adjusters & deductibles</div>
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentType('out-of-pocket')}
                      className={`p-3.5 rounded-lg border text-left transition-all ${
                        paymentType === 'out-of-pocket'
                          ? 'border-[#16203B] bg-slate-50 ring-2 ring-[#E7A622]'
                          : 'border-slate-200 bg-white'
                      }`}
                    >
                      <div className="font-bold text-slate-900 text-sm">Customer Pay / Out-of-Pocket</div>
                      <div className="text-xs text-slate-500 mt-0.5">Direct transparent estimate</div>
                    </button>
                  </div>
                </div>

                {paymentType === 'insurance' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-slate-50 border border-slate-200 rounded-lg">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                        Insurance Carrier
                      </label>
                      <select
                        value={insuranceCarrier}
                        onChange={(e) => setInsuranceCarrier(e.target.value)}
                        className="w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#16203B]"
                      >
                        {INSURANCE_PARTNERS.map((p: { name: string; desc: string }) => (
                          <option key={p.name} value={p.name}>{p.name}</option>
                        ))}
                        <option value="Other">Other Carrier</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                        Claim Number (If available)
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. 0123456-CA"
                        value={claimNumber}
                        onChange={(e) => setClaimNumber(e.target.value)}
                        className="w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#16203B]"
                      />
                    </div>
                  </div>
                )}

                {/* Optional Photo Attachment */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                    Upload Damage Photos (Recommended for Fast Estimate)
                  </label>
                  <div className="border-2 border-dashed border-slate-300 hover:border-[#16203B] rounded-lg p-5 text-center cursor-pointer transition-colors bg-slate-50 relative">
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={handleFakePhotoUpload}
                      className="absolute inset-0 opacity-0 cursor-pointer" 
                    />
                    <Camera className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                    <span className="text-xs font-semibold text-slate-700 block">
                      Tap or click to attach damage photos
                    </span>
                    <span className="text-[11px] text-slate-500">
                      Include 1 wide-angle and 1 close-up of damage
                    </span>
                  </div>
                  {photosUploaded.length > 0 && (
                    <div className="mt-2 text-xs text-emerald-700 font-medium flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>{photosUploaded.length} photo(s) queued for Ron's appraisal team</span>
                    </div>
                  )}
                </div>

                <div className="flex justify-between pt-4">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="px-5 py-2 border border-slate-300 text-slate-700 text-sm font-medium rounded-md hover:bg-slate-50"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep(4)}
                    className="px-6 py-2.5 bg-[#16203B] text-white font-bold text-sm uppercase tracking-wide rounded-md hover:bg-[#0F1626] transition-colors flex items-center gap-2"
                  >
                    <span>Next: Your Contact Info</span>
                    <ArrowRight className="w-4 h-4 text-[#E7A622]" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 4: Contact & Final Submit */}
            {step === 4 && (
              <div className="space-y-4 animate-in fade-in duration-200">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Michael Miller"
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      className="w-full px-3.5 py-2.5 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#16203B]"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      placeholder="e.g. (310) 555-0199"
                      value={contactPhone}
                      onChange={(e) => setContactPhone(e.target.value)}
                      className="w-full px-3.5 py-2.5 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#16203B]"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="e.g. yourname@gmail.com"
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#16203B]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                    Specific Details or Needs (Optional)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Any specific instructions, tow assistance needed, or timeline considerations..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full px-3.5 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#16203B]"
                  />
                </div>

                {/* Summary preview */}
                <div className="p-3 bg-amber-50 border border-amber-200 rounded-md text-xs text-amber-900 space-y-1">
                  <div className="font-bold uppercase tracking-wider">Summary of Request:</div>
                  <div className="text-amber-800">
                    {damageOptions.find(d => d.id === damageType)?.label} for {vehicleYear} {vehicleMake} {vehicleModel || ''}
                    {' '}(Billing: {paymentType === 'insurance' ? insuranceCarrier : 'Customer Pay'})
                  </div>
                </div>

                <div className="flex justify-between pt-4">
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="px-5 py-2 border border-slate-300 text-slate-700 text-sm font-medium rounded-md hover:bg-slate-50"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="px-8 py-3 bg-[#E7A622] hover:bg-[#D3951B] text-[#16203B] font-bold text-sm uppercase tracking-wider rounded-md transition-all shadow-md hover:shadow-lg flex items-center gap-2"
                  >
                    <span>Submit Free Estimate Request</span>
                    <Check className="w-4 h-4 stroke-[3]" />
                  </button>
                </div>
              </div>
            )}

          </form>
        )}
      </div>
    </div>
  );

  if (isModal) {
    if (!isOpen) return null;
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200 overflow-y-auto">
        <div className="max-w-2xl w-full my-8">
          {content}
        </div>
      </div>
    );
  }

  return (
    <section id="estimate" className="py-16 bg-[#F3EFE6] border-b border-slate-300/80">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {content}
      </div>
    </section>
  );
};
