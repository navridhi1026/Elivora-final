import React, { useState } from 'react'
import { ChevronDown, ChevronUp, HelpCircle, MessageCircle } from 'react-feather'
import PageHeader from '../components/PageHeader'
import Container from '../components/Container'
import Button from '../components/Button'

const faqCategories = [
  {
    title: "Orders & Shipping",
    icon: "📦",
    faqs: [
      {
        question: "How long does shipping take?",
        answer: "Standard shipping takes 5-7 business days. Express shipping is available and takes 2-3 business days. Free shipping is available on orders above ₹999."
      },
      {
        question: "Can I track my order?",
        answer: "Yes! Once your order ships, you'll receive a tracking number via email. You can also track your orders from the 'My Orders' page in your account."
      },
      {
        question: "Do you ship internationally?",
        answer: "Currently, we only ship within India. We're working on expanding to international markets soon!"
      },
      {
        question: "What if my order is delayed?",
        answer: "If your order hasn't arrived within the estimated delivery time, please contact our customer support with your order number, and we'll investigate immediately."
      }
    ]
  },
  {
    title: "Returns & Refunds",
    icon: "↩️",
    faqs: [
      {
        question: "What is your return policy?",
        answer: "We offer a 30-day return policy. Items must be unworn, unwashed, and in original packaging with tags attached. Return shipping is free for defective items."
      },
      {
        question: "How do I initiate a return?",
        answer: "Go to 'My Orders', select the order you want to return, and click 'Return Item'. Follow the instructions to complete the process."
      },
      {
        question: "When will I receive my refund?",
        answer: "Refunds are processed within 5-7 business days after we receive your returned item. The amount will be credited to your original payment method."
      },
      {
        question: "Can I exchange an item?",
        answer: "Yes! You can exchange items for a different size or color. Select 'Exchange' instead of 'Return' when initiating the process."
      }
    ]
  },
  {
    title: "Payment & Pricing",
    icon: "💳",
    faqs: [
      {
        question: "What payment methods do you accept?",
        answer: "We accept all major credit/debit cards, UPI, net banking, and digital wallets. Cash on delivery is available for orders below ₹5000."
      },
      {
        question: "Is my payment information secure?",
        answer: "Absolutely! We use industry-standard encryption and never store your complete payment details. All transactions are processed through secure payment gateways."
      },
      {
        question: "Do you offer discounts or promotions?",
        answer: "Yes! Subscribe to our newsletter to receive exclusive discounts, early access to sales, and special promotions. Follow us on social media for flash sales."
      },
      {
        question: "Can I use multiple discount codes?",
        answer: "Only one discount code can be applied per order. The system will automatically apply the code that gives you the maximum discount."
      }
    ]
  },
  {
    title: "Products & Sizing",
    icon: "👗",
    faqs: [
      {
        question: "How do I find my size?",
        answer: "Each product page has a detailed size guide. You can also use our AI Virtual Try-On feature to see how items will look on you before purchasing."
      },
      {
        question: "Are the colors accurate in photos?",
        answer: "We strive for accuracy, but colors may vary slightly due to screen settings and lighting. Check customer photos in reviews for real-life examples."
      },
      {
        question: "What materials are your clothes made from?",
        answer: "Material details are listed on each product page. We use high-quality fabrics including cotton, linen, silk, and sustainable materials. Care instructions are included."
      },
      {
        question: "Do you restock sold-out items?",
        answer: "Popular items are regularly restocked. Click 'Notify Me' on sold-out products to receive an email when they're back in stock."
      }
    ]
  },
  {
    title: "Account & Privacy",
    icon: "👤",
    faqs: [
      {
        question: "Do I need an account to shop?",
        answer: "No, you can checkout as a guest. However, creating an account lets you track orders, save wishlist items, and checkout faster."
      },
      {
        question: "How do I reset my password?",
        answer: "Click 'Forgot Password' on the login page and enter your email. You'll receive a password reset link within minutes."
      },
      {
        question: "How is my data protected?",
        answer: "We take privacy seriously. Your data is encrypted and never shared with third parties without your consent. Read our Privacy Policy for details."
      },
      {
        question: "Can I delete my account?",
        answer: "Yes, you can delete your account from Account Settings. Note that this action is permanent and will delete your order history."
      }
    ]
  },
  {
    title: "Virtual Try-On & AI Features",
    icon: "✨",
    faqs: [
      {
        question: "How does Virtual Try-On work?",
        answer: "Upload your photo and select a product. Our AI technology will show you how the outfit looks on you, giving you confidence before purchasing."
      },
      {
        question: "Is my photo stored?",
        answer: "Photos uploaded for try-on are processed in real-time and deleted immediately after. We never store or use your photos for any other purpose."
      },
      {
        question: "How accurate is the AI recommendation?",
        answer: "Our AI considers body type, skin tone, and fashion trends to provide personalized recommendations with 90%+ accuracy based on user feedback."
      }
    ]
  }
]

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState(0)
  const [openFAQ, setOpenFAQ] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')

  const toggleFAQ = (categoryIndex, faqIndex) => {
    const key = `${categoryIndex}-${faqIndex}`
    setOpenFAQ(openFAQ === key ? null : key)
  }

  // Filter FAQs based on search
  const filteredCategories = faqCategories.map(category => ({
    ...category,
    faqs: category.faqs.filter(faq => 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.faqs.length > 0)

  return (
    <main className="my-14">
      <PageHeader>Frequently Asked Questions</PageHeader>
      
      <Container>
        {/* Header */}
        <div className="text-center mb-12">
          <HelpCircle className="w-16 h-16 text-purple-500 mx-auto mb-4" />
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Find answers to common questions about shopping at Elivora. 
            Can't find what you're looking for? Contact our support team!
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-12">
          <input
            type="text"
            placeholder="Search for answers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-6 py-4 text-lg border-2 border-gray-300 rounded-full focus:border-purple-500 focus:outline-none shadow-sm"
          />
        </div>

        {/* Category Tabs */}
        {!searchQuery && (
          <div className="flex overflow-x-auto gap-2 mb-8 pb-2">
            {faqCategories.map((category, index) => (
              <button
                key={index}
                onClick={() => setActiveCategory(index)}
                className={`px-6 py-3 rounded-full whitespace-nowrap font-semibold transition ${
                  activeCategory === index
                    ? 'bg-purple-600 text-white shadow-lg'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {category.icon} {category.title}
              </button>
            ))}
          </div>
        )}

        {/* FAQ List */}
        <div className="max-w-4xl mx-auto">
          {(searchQuery ? filteredCategories : [faqCategories[activeCategory]]).map((category, categoryIndex) => (
            <div key={categoryIndex} className="mb-8">
              {searchQuery && (
                <h3 className="text-xl font-bold mb-4">
                  {category.icon} {category.title}
                </h3>
              )}
              <div className="space-y-4">
                {category.faqs.map((faq, faqIndex) => {
                  const key = `${searchQuery ? categoryIndex : activeCategory}-${faqIndex}`
                  const isOpen = openFAQ === key
                  
                  return (
                    <div 
                      key={faqIndex}
                      className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200"
                    >
                      <button
                        onClick={() => toggleFAQ(searchQuery ? categoryIndex : activeCategory, faqIndex)}
                        className="w-full px-6 py-4 flex justify-between items-center hover:bg-gray-50 transition"
                      >
                        <span className="font-semibold text-left text-gray-800">
                          {faq.question}
                        </span>
                        {isOpen ? (
                          <ChevronUp className="text-purple-600 flex-shrink-0" />
                        ) : (
                          <ChevronDown className="text-gray-400 flex-shrink-0" />
                        )}
                      </button>
                      
                      {isOpen && (
                        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                          <p className="text-gray-700 leading-relaxed">
                            {faq.answer}
                          </p>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Contact Support Section */}
        <div className="mt-16 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl p-8 text-center">
          <MessageCircle className="w-12 h-12 mx-auto mb-4" />
          <h3 className="text-2xl font-bold mb-2">Still have questions?</h3>
          <p className="mb-6 opacity-90">
            Our customer support team is here to help you 24/7
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button className="bg-white text-purple-600 hover:bg-gray-100">
              Chat with Us
            </Button>
            <Button secondary className="border-2 border-white text-white hover:bg-white hover:text-purple-600">
              Email Support
            </Button>
          </div>
          <p className="mt-4 text-sm opacity-75">
            Average response time: 2 hours
          </p>
        </div>
      </Container>
    </main>
  )
}
