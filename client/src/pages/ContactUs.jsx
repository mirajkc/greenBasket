import React, { useState } from 'react'
import { Phone, Mail, MapPin, Clock, CreditCard, RefreshCw, MessageCircle, HelpCircle } from 'lucide-react'

const ContactUs = () => {
  const [activeSection, setActiveSection] = useState('contact-us')

  const sections = [
    { id: 'contact-us', title: 'Contact Us', icon: MessageCircle },
    { id: 'faqs', title: 'FAQs', icon: HelpCircle },
    { id: 'returns', title: 'Returns & Refunds', icon: RefreshCw },
    { id: 'payment-methods', title: 'Payment Methods', icon: CreditCard }
  ]

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="px-6 md:px-16 lg:px-24 xl:px-32 py-4">
          <div className="flex flex-wrap gap-1 justify-center md:justify-start">
            {sections.map((section) => {
              const IconComponent = section.icon
              return (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeSection === section.id
                      ? 'bg-green-600 text-white'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <IconComponent size={16} />
                  {section.title}
                </button>
              )
            })}
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="px-6 md:px-16 lg:px-24 xl:px-32 py-12">
        
        {/* Contact Us Section */}
        {activeSection === 'contact-us' && (
          <section className="space-y-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Contact Us</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                At GreenBasket, we believe in staying connected. Whether you have a question, feedback, or need help with an order, our support team is just a message away.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <Mail className="text-green-600 mb-4" size={24} />
                <h4 className="font-semibold text-gray-900 mb-2">Customer Support</h4>
                <p className="text-gray-600">support@greenbasket.com</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <Phone className="text-green-600 mb-4" size={24} />
                <h4 className="font-semibold text-gray-900 mb-2">Helpline</h4>
                <p className="text-gray-600">+977-9800000000</p>
                <p className="text-gray-500 text-sm mt-1">9 AM – 9 PM daily</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <Clock className="text-green-600 mb-4" size={24} />
                <h4 className="font-semibold text-gray-900 mb-2">Live Chat</h4>
                <p className="text-gray-600">Available during business hours</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <Mail className="text-green-600 mb-4" size={24} />
                <h4 className="font-semibold text-gray-900 mb-2">Business Inquiries</h4>
                <p className="text-gray-600">business@greenbasket.com</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 md:col-span-2">
                <MapPin className="text-green-600 mb-4" size={24} />
                <h4 className="font-semibold text-gray-900 mb-2">Address</h4>
                <p className="text-gray-600">GreenBasket Pvt. Ltd., Mid Baneshwor, Kathmandu, Nepal</p>
              </div>
            </div>
            
            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <p className="text-green-800">
                You can also reach out to us through our social media handles. We usually respond within a few hours. Your satisfaction is our top priority.
              </p>
            </div>
          </section>
        )}

        {/* FAQs Section */}
        {activeSection === 'faqs' && (
          <section className="space-y-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
              <p className="text-lg text-gray-600">Find answers to common questions about our service</p>
            </div>
            
            <div className="space-y-6">
              {[
                {
                  q: "What areas do you deliver to?",
                  a: "We currently deliver across Kathmandu Valley and expanding to other major cities soon. Enter your PIN code at checkout to confirm availability."
                },
                {
                  q: "Can I schedule a delivery time?",
                  a: "Yes, you can choose from available time slots during checkout. We offer morning, afternoon, and evening deliveries for your convenience."
                },
                {
                  q: "Is there a delivery fee?",
                  a: "Orders above NPR 1,000 enjoy free delivery. For smaller orders, a nominal delivery charge of NPR 75 is applied."
                },
                {
                  q: "What if an item is missing from my order?",
                  a: "Please contact us within 24 hours. We'll either refund the item or deliver the missing item at no extra cost."
                },
                {
                  q: "How do I apply a coupon?",
                  a: "You can enter your coupon code at the checkout page in the promo section. Make sure the coupon is still valid and applicable to your items."
                },
                {
                  q: "Can I return a product I don't like?",
                  a: "While perishable goods are non-returnable unless defective, sealed packaged items can be returned within 7 days. Refer to our return policy for more details."
                }
              ].map((faq, index) => (
                <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">{faq.q}</h4>
                  <p className="text-gray-600 leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Return & Refund Policy Section */}
        {activeSection === 'returns' && (
          <section className="space-y-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Return & Refund Policy</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                We strive to deliver quality products with care. If you're not satisfied with your order, here's how we can help.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  title: "Eligibility",
                  content: "You may request a return if the item is damaged, expired, incorrect, or defective."
                },
                {
                  title: "Time Frame",
                  content: "You must report the issue within 7 days of delivery."
                },
                {
                  title: "Unacceptable Returns",
                  content: "Opened food packages, fresh produce (unless damaged), and used items."
                },
                {
                  title: "Return Process",
                  content: "Contact support with your order number and a photo of the issue. Our team will guide you through pickup or self-return instructions."
                },
                {
                  title: "Refund Method",
                  content: "Refunds are issued via the original payment method or wallet credit."
                },
                {
                  title: "Processing Time",
                  content: "3–5 business days after we receive and inspect the returned item."
                }
              ].map((item, index) => (
                <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <h4 className="font-semibold text-gray-900 mb-3">{item.title}</h4>
                  <p className="text-gray-600">{item.content}</p>
                </div>
              ))}
            </div>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <p className="text-blue-800">
                If your issue involves a missing item, incorrect product, or delivery error, we will either redeliver or offer a refund immediately.
              </p>
            </div>
          </section>
        )}

        {/* Payment Methods Section */}
        {activeSection === 'payment-methods' && (
          <section className="space-y-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Payment Methods</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Shopping with GreenBasket is simple, secure, and flexible. We support a variety of payment options.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: "Cash on Delivery (COD)",
                  content: "Pay by cash when your order is delivered. Available in most regions."
                },
                {
                  title: "Digital Wallets",
                  content: "eSewa, Khalti – Pay instantly with your favorite Nepali wallets."
                },
                {
                  title: "Credit/Debit Cards",
                  content: "We accept all major cards (Visa, MasterCard). Payments are processed via secure gateways with OTP verification."
                },
                {
                  title: "Bank Transfer",
                  content: "You may also deposit the order amount to our bank account and send us the confirmation screenshot."
                },
                {
                  title: "Wallet Credit",
                  content: "Earn cashback and apply credits during your next order through your GreenBasket Wallet."
                }
              ].map((method, index) => (
                <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <h4 className="font-semibold text-gray-900 mb-3">{method.title}</h4>
                  <p className="text-gray-600">{method.content}</p>
                </div>
              ))}
            </div>
            
            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <p className="text-green-800">
                All payment information is encrypted and securely processed. We do not store your card details.
              </p>
            </div>
          </section>
        )}
      </div>
    </div>
  )
}

export default ContactUs