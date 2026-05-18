/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef } from 'react';
import { Menu, X } from 'lucide-react';
import { motion } from 'motion/react';
import { ScrollVelocity } from './components/ScrollVelocity';
import VariableProximity from './components/VariableProximity';

const QuantityControl = ({ onUpdate }: { onUpdate: (delta: number) => void }) => {
  const [quantity, setQuantity] = useState(0);

  const handleUpdate = (delta: number) => {
    const newQty = Math.max(0, quantity + delta);
    setQuantity(newQty);
    onUpdate(delta);
  };

  return (
    <div className="flex items-center gap-2 mt-2">
      <button onClick={() => handleUpdate(-1)} className="bg-gray-700 hover:bg-gray-600 text-white w-8 h-8 rounded">-</button>
      <span className="font-bold text-lg w-8 text-center">{quantity}</span>
      <button onClick={() => handleUpdate(1)} className="bg-red-600 hover:bg-red-500 text-white w-8 h-8 rounded">+</button>
    </div>
  );
};

const FloatingViewOrder = ({ totalQuantity, onOpen }: { totalQuantity: number, onOpen: () => void }) => {
  if (totalQuantity === 0) return null;
  return (
    <motion.button 
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={onOpen} 
      className="fixed bottom-8 right-8 bg-white text-black font-bold uppercase py-4 px-8 rounded-full shadow-2xl z-[100] cursor-pointer hover:bg-gray-200"
    >
      View Order ({totalQuantity})
    </motion.button>
  );
};

const LocationSection = () => {
  return (
    <section className="bg-black text-white p-8 md:p-16 border-t border-red-800">
      <h2 className="text-4xl md:text-6xl font-display uppercase tracking-tight text-red-600 mb-8">Our Location</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="bg-gray-900 p-8 rounded-xl border border-gray-700">
          <h3 className="text-2xl font-bold text-red-500 mb-4">The Bang Bang Hotpot</h3>
          <p className="text-lg text-gray-300">Coordinates: 24.9269717, 67.112991</p>
          <a
            href="https://maps.app.goo.gl/71KNqAuYT2phTm7g6"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-4 bg-red-600 text-white font-bold py-2 px-4 rounded hover:bg-red-500"
          >
            View on Map
          </a>
        </div>
        <div className="w-full h-64 bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14479.28821950485!2d67.112991!3d24.9269717!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb339002c31fe8b%3A0x60409fc904e6b855!2sThe%20Bang%20Bang%20Hotpot!5e0!3m2!1sen!2s!4v1716035072000!5m2!1sen!2s"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Location Map"
          />
        </div>
      </div>
    </section>
  );
};

const ReviewModal = ({ itemName, onClose }: { itemName: string, onClose: () => void }) => {
  const [reviews, setReviews] = useState<{user: string, comment: string, rating: number}[]>([
    { user: "Foodie", comment: "Absolutely delicious!", rating: 5 },
    { user: "FastEater", comment: "Good, but could be spicier.", rating: 4 }
  ]);
  const [newReview, setNewReview] = useState("");
  const [newRating, setNewRating] = useState(5);

  const submitReview = () => {
    if (newReview) {
      setReviews([...reviews, { user: "You", comment: newReview, rating: newRating }]);
      setNewReview("");
    }
  };

  return (
    <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="fixed inset-0 z-[300] bg-black bg-opacity-95 flex items-center justify-center p-4"
      >
      <div className="bg-gray-900 p-8 rounded-xl w-full max-w-lg border border-red-800 shadow-2xl">
        <h2 className="text-3xl font-bold mb-6 text-red-500 font-display">Reviews for {itemName}</h2>
        <div className="max-h-80 overflow-y-auto mb-6 pr-2 space-y-4">
          {reviews.map((r, i) => (
            <div key={i} className="p-4 bg-black rounded-lg border border-gray-800">
              <div className="flex justify-between items-center mb-2">
                <p className="font-bold text-white">{r.user}</p>
                <p className="text-yellow-500 font-bold">{r.rating} / 5 ⭐</p>
              </div>
              <p className="text-gray-300">{r.comment}</p>
            </div>
          ))}
        </div>
        
        <div className="space-y-4">
          <textarea
            value={newReview}
            onChange={(e) => setNewReview(e.target.value)}
            className="w-full p-4 bg-black rounded-lg text-white border border-gray-700 focus:border-red-500 outline-none"
            placeholder="Write your review here..."
            rows={3}
          />
          <div className="flex items-center gap-4">
            <span className="text-gray-400">Rating:</span>
            <select
              value={newRating}
              onChange={(e) => setNewRating(Number(e.target.value))}
              className="bg-black text-white p-2 rounded border border-gray-700"
            >
              {[5,4,3,2,1].map(num => <option key={num} value={num}>{num} ⭐</option>)}
            </select>
          </div>
          <div className="flex gap-4 mt-2">
            <button onClick={submitReview} className="flex-1 bg-red-600 hover:bg-red-500 text-white font-bold py-3 rounded uppercase">Submit Review</button>
            <button onClick={onClose} className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 rounded uppercase">Close</button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const BrothSection = ({ onUpdateOrder, itemClass }: { onUpdateOrder: (delta: number) => void, itemClass: string }) => {
  const broths = [
    { name: "MANGOLIAN BROTH", price: "RS 500", description: "Rich and aromatic traditional Mongolian broth.", image: "https://i.ibb.co/99h8N33G/image.png" },
    { name: "CHINESE BROTH", price: "RS 500", description: "Classic Chinese herbal hotpot soup.", image: "https://i.ibb.co/7tD57vfT/image.png" },
  ];

  return (
    <section className="bg-black text-white p-8 md:p-16 flex flex-col md:flex-row items-center justify-between gap-12">
      <div className="flex flex-col items-center md:items-start gap-4">
        <h2 className="text-8xl font-display uppercase tracking-tighter text-red-600">BROTH</h2>
        <span className="text-6xl font-display uppercase tracking-widest">肉汤</span>
      </div>
      
      <div className="flex flex-col gap-12 w-full max-w-2xl">
        {broths.map((broth, index) => (
          <motion.div 
            key={index} 
            className={itemClass}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <div className={`flex flex-col ${index === 1 ? 'sm:order-2' : ''}`}>
              <h3 className="text-3xl font-display uppercase tracking-tight">{broth.name}</h3>
              <p className="text-2xl font-serif">{broth.price}</p>
              <p className="text-sm text-gray-400 mb-2">{broth.description}</p>
              <div className="flex gap-2">
                <QuantityControl onUpdate={onUpdateOrder} />
                <button onClick={() => setActiveReviewItem(broth.name)} className="px-4 py-2 mt-2 bg-gray-700 text-white rounded">Reviews</button>
              </div>
            </div>
            
            <div className={`relative flex items-center justify-center ${index === 1 ? 'sm:order-1' : ''}`}>
              <div className="w-32 h-32 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-white flex-shrink-0">
                <img src={broth.image} alt={broth.name} className="w-full h-full object-cover" />
              </div>
              {/* Professional connecting arrow */}
              <svg className={`hidden md:block absolute top-1/2 -mt-10 ${index === 0 ? '-left-32' : '-right-32'} w-32 h-24`} viewBox="0 0 100 50" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                <path d={index === 0 ? "M 95 10 C 30 10 30 40 5 40" : "M 5 10 C 70 10 70 40 95 40"} />
                {/* Professional arrowhead */}
                <path d={index === 0 ? "M 5 40 L 15 30 L 15 50 Z" : "M 95 40 L 85 30 L 85 50 Z"} fill="white" />
              </svg>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-red-700 text-white p-6 border-t border-red-800 flex flex-col md:flex-row justify-between items-center px-4 md:px-16 gap-4 text-center">
      <p>&copy; {new Date().getFullYear()} The Bang Bang Hotpot. All rights reserved.</p>
      <img src="https://i.ibb.co/k2YNHxBy/Chat-GPT-Image-May-18-2026-11-43-56-PM.png" alt="Logo" className="h-16 w-16 object-contain" />
      <p className="font-display text-2xl uppercase text-red-100">The Bang Bang Hotpot</p>
    </footer>
  );
};

export default function App() {
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);
  const [activeReviewItem, setActiveReviewItem] = useState<string | null>(null);
  const [deliveryDetails, setDeliveryDetails] = useState({ address: '', phone: '' });
  const containerRef = useRef(null);

  const updateOrder = (delta: number) => {
    setTotalQuantity((prev) => Math.max(0, prev + delta));
  };
  
  const clearOrder = () => {
    setTotalQuantity(0);
    setIsCheckingOut(false);
    setIsOrderPlaced(false);
    setDeliveryDetails({ address: '', phone: '' });
  };

  const itemContainerClass = "flex flex-col sm:flex-row items-center gap-6 transition-transform duration-300 hover:scale-105 hover:shadow-[0_0_15px_rgba(255,255,255,0.2)] p-4 rounded-xl flex-wrap";
  
  return (
    <div className="min-h-screen bg-black text-white font-sans overflow-x-hidden">
      <nav className="bg-red-600 flex items-center justify-between px-8 py-4 text-black sticky top-0 z-50">
        <div className="flex items-center gap-2 font-display uppercase tracking-tighter text-2xl font-bold">
          <span className="text-black">BANG BANG</span>
          <span className="text-black">HOTPOT</span>
        </div>
        
        {/* Desktop Links */}
        <div className="hidden md:flex gap-8 uppercase font-serif text-lg font-bold mr-[-12px]">
          <a href="#broth" className="hover:underline">BROTH</a>
          <a href="#noodles" className="hover:underline">NOODLES</a>
          <a href="#meat" className="hover:underline">MEAT</a>
          <a href="#seafood" className="hover:underline">SEAFOOD</a>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:block">
        </div>
      </nav>

      <motion.header
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex flex-col items-center p-8"
      >
        <div className="flex flex-wrap items-center justify-center gap-4">
          <span className="text-3xl font-bold -rotate-12 italic text-red-600">THE</span>
          <h1 className="text-4xl md:text-8xl font-display uppercase tracking-tighter text-red-600">
            BANG BANG
          </h1>
          <div className="flex items-end gap-2">
            <h1 className="text-4xl md:text-8xl font-display uppercase tracking-tighter text-red-600">
              HOTPOT
            </h1>
            <img 
              src="https://i.ibb.co/pBB624cB/Chat-GPT-Image-May-18-2026-02-30-25-AM-removebg-preview-1.png" 
              alt="Hotpot" 
              className="w-12 h-12 md:w-24 md:h-24 object-contain" 
              referrerPolicy="no-referrer" 
            />
          </div>
        </div>
        <hr className="w-full my-6 border-t-2 border-white" />
        <h2 className="text-2xl md:text-4xl font-display uppercase text-red-600 mb-6 text-center">
          WELCOME TO BANG BANG HOTPOT
        </h2>
        <div ref={containerRef} className="max-w-3xl text-center text-lg md:text-xl font-medium leading-relaxed drop-shadow-lg transition-transform duration-500 hover:scale-[1.02] cursor-default" style={{position: 'relative'}}>
          <VariableProximity
            label="DIVE INTO AN AUTHENTIC CHINESE HOTPOT EXPERIENCE WHERE RICH, SIMMERING BROTHS MEET FRESH, PREMIUM INGREDIENTS. WHETHER YOU LOVE THE FIERY KICK OF A TRADITIONAL SICHUAN PEPPER BROTH OR PREFER A COMFORTING, SLOW-COOKED HERBAL SOUP, WE BRING THE TRUE TASTE OF REGIONAL CHINESE CUISINE STRAIGHT TO YOUR TABLE."
            className="variable-proximity-demo"
            fromFontVariationSettings="'wght' 400, 'opsz' 9"
            toFontVariationSettings="'wght' 1000, 'opsz' 40"
            containerRef={containerRef}
            radius={100}
            falloff="linear"
          />
        </div>
      </motion.header>

      <div id="broth">
        <BrothSection onUpdateOrder={updateOrder} itemClass={itemContainerClass} />
      </div>

      <div id="noodles">
        <NoodlesSection onUpdateOrder={updateOrder} itemClass={itemContainerClass} />
      </div>
      
      <div id="meat">
        <MeatSection onUpdateOrder={updateOrder} itemClass={itemContainerClass} />
      </div>
      <div id="seafood">
        <SeafoodSection onUpdateOrder={updateOrder} itemClass={itemContainerClass} />
      </div>
      <LocationSection />
      <ScrollVelocity
        texts={['BANG BANG HOTPOT', 'FRESH INGREDIENTS', 'AUTHENTIC TASTE']}
        velocity={100}
        className="font-display text-3xl md:text-5xl text-red-600"
      />
      
      {isCheckingOut && (
        <div className="fixed inset-0 z-[200] bg-black bg-opacity-95 flex flex-col items-center justify-center p-8">
          {!isOrderPlaced ? (
            <>
              <h2 className="text-4xl font-bold mb-8 uppercase font-display text-red-600">Checkout</h2>
              <p className="text-2xl mb-8 font-bold">Total Items: {totalQuantity}</p>
              
              <div className="w-full max-w-md flex flex-col gap-4 mb-8">
                <input
                  type="text"
                  placeholder="Enter Delivery Address"
                  className="p-4 bg-gray-800 rounded text-white border border-gray-600 focus:border-red-500 outline-none"
                  value={deliveryDetails.address}
                  onChange={(e) => setDeliveryDetails({ ...deliveryDetails, address: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Enter Phone Number"
                  className="p-4 bg-gray-800 rounded text-white border border-gray-600 focus:border-red-500 outline-none"
                  value={deliveryDetails.phone}
                  onChange={(e) => setDeliveryDetails({ ...deliveryDetails, phone: e.target.value })}
                />
              </div>
    
              <button
                onClick={() => {
                  if (deliveryDetails.address && deliveryDetails.phone) {
                    setIsOrderPlaced(true);
                  } else {
                    alert('Please enter both address and phone number.');
                  }
                }}
                className="bg-red-600 hover:bg-red-500 text-white font-bold py-4 px-8 rounded mb-4 w-full max-w-md uppercase"
              >
                Complete Order
              </button>
              
              <button className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-4 px-8 rounded mb-4 w-full max-w-md uppercase" onClick={clearOrder}>Clear Order</button>
              <button className="text-gray-400 mt-8 hover:text-white" onClick={() => setIsCheckingOut(false)}>Close</button>
            </>
          ) : (
            <>
              <h2 className="text-4xl font-bold mb-8 uppercase font-display text-green-500">Order Confirmed!</h2>
              <div className="bg-gray-800 p-6 rounded-lg w-full max-w-md mb-8">
                 <p className="mb-2"><strong>Address:</strong> {deliveryDetails.address}</p>
                 <p className="mb-2"><strong>Phone:</strong> {deliveryDetails.phone}</p>
                 <p className="mb-2"><strong>Total Items:</strong> {totalQuantity}</p>
                 <p className="font-bold text-red-500">Estimated Delivery: 30 - 45 Minutes</p>
              </div>
              <button className="bg-red-600 hover:bg-red-500 text-white font-bold py-4 px-8 rounded mb-4 w-full max-w-md uppercase" onClick={() => { setIsCheckingOut(false); clearOrder(); }}>Close</button>
            </>
          )}
        </div>
      )}
      
      {activeReviewItem && (
        <ReviewModal itemName={activeReviewItem} onClose={() => setActiveReviewItem(null)} />
      )}
      
      <FloatingViewOrder totalQuantity={totalQuantity} onOpen={() => setIsCheckingOut(true)} />
      <Footer />
    </div>
  );
}

const MeatSection = ({ onUpdateOrder, itemClass }: { onUpdateOrder: (delta: number) => void, itemClass: string }) => {
  const meats = [
    { name: "BEEF SLIDERS", price: "RS 600", description: "Juicy beef patties in mini buns.", image: "https://i.ibb.co/HT3Zj8mt/A-chopsticks-holding-sliced-beef-vector-image-on-Vector-Stock-removebg-preview.png" },
    { name: "CHICKEN DUMPLINGS", price: "RS 400", description: "Soft dumplings filled with spiced chicken.", image: "https://i.ibb.co/VYWr1bdg/Ground-Beef-and-Dumplings-That-Will-Warm-Your-Soul-removebg-preview.png" },
    { name: "BEEF DUMPLINGS", price: "RS 450", description: "Savory beef filling in delicate dough.", image: "https://i.ibb.co/dwyBjhrv/Spicy-Chicken-Dumplings-with-Chilli-Oil-Savory-Sweet-Food-removebg-preview.png" },
    { name: "BEEF SAUSAGE", price: "RS 450", description: "Grilled savory beef sausage links.", image: "https://i.ibb.co/PR43xsM/Irresistible-Honey-Garlic-Sausage-Recipe-You-Must-Try.jpg" },
    { name: "CHICKEN SLIDERS", price: "RS 500", description: "Tender chicken fillets on mini buns.", image: "https://i.ibb.co/4ZPzVzZT/Gemini-Generated-Image-88mrqm88mrqm88mr-removebg-preview.png" },
    { name: "CHICKEN SAUSAGE", price: "RS 400", description: "Seasoned chicken sausage with herbs.", image: "https://i.ibb.co/Lzb3byBs/Chicken-Sausage-Air-Fryer-Recipe-Whole-Lotta-Yum-removebg-preview.png" },
  ];

  return (
    <section className="bg-black text-white p-8 md:p-16 border-t border-red-800">
      <div className="flex items-center gap-4 mb-16 text-red-600 [text-shadow:0_0_15px_rgba(220,38,38,0.5)]">
        <h2 className="text-6xl md:text-8xl font-display uppercase tracking-tighter">MEAT</h2>
        <span className="text-4xl md:text-6xl font-display uppercase tracking-widest">肉</span>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {meats.map((meat, index) => (
          <motion.div 
            key={index} 
            className={itemClass}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <img src={meat.image} alt={meat.name} className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-2 border-red-600 object-cover shadow-[0_0_20px_rgba(220,38,38,0.3)] flex-shrink-0" />
            <div className="flex flex-col">
              <h3 className="text-2xl font-display uppercase text-red-600 drop-shadow-[0_0_5px_rgba(220,38,38,0.5)]">{meat.name}</h3>
              <p className="text-xl font-bold">{meat.price}</p>
              <p className="text-sm text-gray-400 mb-2">{meat.description}</p>
              <div className="flex gap-2">
                <QuantityControl onUpdate={onUpdateOrder} />
                <button onClick={() => setActiveReviewItem(meat.name)} className="px-4 py-2 mt-2 bg-gray-700 text-white rounded">Reviews</button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const SeafoodSection = ({ onUpdateOrder, itemClass }: { onUpdateOrder: (delta: number) => void, itemClass: string }) => {
  const seafoodAndSidelines = [
    { title: "SEAFOOD", subtitle: "海鲜", color: "pink-500", items: [
      { name: "SHRIMP", price: "RS 999", description: "Fresh, succulent tiger prawns.", image: "https://i.ibb.co/9k7Zthd9/Schnucks-31-40-Cooked-Tail-Off-Shrimp-16-Oz-removebg-preview.png" },
      { name: "FISH CUBE", price: "RS 700", description: "Tender cubes of fresh fillet fish.", image: "https://i.ibb.co/n5jL8v3/Raw-salmon-piece-cube-with-rosemary-containing-salmon-cut-and-isolated-removebg-preview.png" },
    ] },
    { title: "SIDELINE", subtitle: "副业", color: "green-400", items: [
      { name: "PEANUT SAUSE", price: "RS 300", description: "Rich, nutty traditional peanut dip.", image: "https://i.ibb.co/RGgbW44V/Best-Thai-Peanut-Sauce-removebg-preview.png" },
      { name: "ROSTED PENUTS", price: "RS 250", description: "Crunchy, perfectly roasted salted peanuts.", image: "https://i.ibb.co/PGh1x36W/Roasted-Salted-Peanuts-Crunchy-Snack-for-Healthy-Lifestyle-Natural-Protein-Snack-removebg-previe.png" },
      { name: "GARLIC CUCUMBERS", price: "RS 250", description: "Refreshing cucumber salad with garlic.", image: "https://i.ibb.co/TD5bPSHT/Spicy-Asian-Cucumber-Salad-Oi-Muchim-removebg-preview.png" },
    ] }
  ];

  return (
    <section className="bg-black text-white p-8 md:p-16 border-t border-red-800">
      {seafoodAndSidelines.map((section, sIndex) => (
        <div key={sIndex} className={sIndex > 0 ? "mt-16 pt-16 border-t border-gray-700" : ""}>
          <div className={`flex items-center gap-4 mb-16 text-${section.color} [text-shadow:0_0_15px_rgba(244,114,182,0.5)]`}>
            <h2 className="text-6xl md:text-8xl font-display uppercase tracking-tighter">{section.title}</h2>
            <span className="text-4xl md:text-6xl font-display uppercase tracking-widest">{section.subtitle}</span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {section.items.map((item, index) => (
              <motion.div 
                key={index} 
                className={itemClass}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <img src={item.image} alt={item.name} className={`w-24 h-24 sm:w-32 sm:h-32 rounded-full border-2 border-${section.color} object-cover shadow-[0_0_20px_rgba(74,222,128,0.3)] flex-shrink-0`} />
                <div className="flex flex-col">
                  <h3 className={`text-2xl font-display uppercase text-${section.color} drop-shadow-[0_0_5px_rgba(244,114,182,0.5)]`}>{item.name}</h3>
                  <p className="text-xl font-bold">{item.price}</p>
                  <p className="text-sm text-gray-400 mb-2">{item.description}</p>
                  <div className="flex gap-2">
                    <QuantityControl onUpdate={onUpdateOrder} />
                    <button onClick={() => setActiveReviewItem(item.name)} className="px-4 py-2 mt-2 bg-gray-700 text-white rounded">Reviews</button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
};

const NoodlesSection = ({ onUpdateOrder, itemClass }: { onUpdateOrder: (delta: number) => void, itemClass: string }) => {
  const noodles = [
    { name: "CHINESE NOODLES", price: "RS 300", description: "Authentic handmade wheat noodles.", image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?q=80&w=300&auto=format&fit=crop" },
    { name: "EGG NOODLES", price: "RS 300", description: "Rich and silky egg-based noodles.", image: "https://i.ibb.co/84K1S7J8/images-removebg-preview.png" },
    { name: "INSTANT NOODLES", price: "RS 250", description: "Quick, comforting classic ramen style.", image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?q=80&w=300&auto=format&fit=crop" },
  ];

  return (
    <section className="bg-black text-white p-8 md:p-16 border-t border-red-800">
      <div className="flex items-center gap-4 mb-16 text-yellow-500 [text-shadow:0_0_15px_rgba(234,179,8,0.5)]">
        <h2 className="text-6xl md:text-8xl font-display uppercase tracking-tighter">NOODLES</h2>
        <span className="text-4xl md:text-6xl font-display uppercase tracking-widest">面条</span>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {noodles.map((noodle, index) => (
          <motion.div 
            key={index} 
            className={itemClass}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <img src={noodle.image} alt={noodle.name} className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-2 border-yellow-500 object-cover shadow-[0_0_20px_rgba(234,179,8,0.3)] flex-shrink-0" />
            <div className="flex flex-col">
              <h3 className="text-2xl font-display uppercase text-yellow-500 drop-shadow-[0_0_5px_rgba(234,179,8,0.5)]">{noodle.name}</h3>
              <p className="text-xl font-bold">{noodle.price}</p>
              <p className="text-sm text-gray-400 mb-2">{noodle.description}</p>
              <div className="flex gap-2">
                <QuantityControl onUpdate={onUpdateOrder} />
                <button onClick={() => setActiveReviewItem(noodle.name)} className="px-4 py-2 mt-2 bg-gray-700 text-white rounded">Reviews</button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
