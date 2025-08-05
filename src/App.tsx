import './App.css'
import ContactSection from './components/Contact/Contact';
import Footer from './components/Footer/Footer';
import NavigationLink from './components/Header/Navigation';
import HeroSection from './components/Hero/Hero';
import ServicesSection from './components/Services/Services';
import About from './components/About/About';

function App() {
  
  const handleContactSubmit = async (formData: any) => {
    // send the data to your backend here
    console.log('Contact form submitted:', formData);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Show a success message here
    alert('Thank you! Your message has been sent successfully.');
  };

  return (
    <div className="min-h-screen bg-white">
      <NavigationLink />
      <main className="">
          <HeroSection />
          <About />
          <ServicesSection />
          <ContactSection onSubmit={handleContactSubmit} />
          <Footer />
      </main>
    </div>
  )
}

export default App
