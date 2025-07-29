import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

interface DeliveryInfo {
  recipientEmail: string;
  recipientPhone: string;
  contactMethod: 'email' | 'phone';
  cardData: {
    cardId: number;
    recipientName: string;
    senderName: string;
    message: string;
    useAI: boolean;
  };
  uniqueCardId: string;
}

const CardConfirmPage = () => {
  const [deliveryInfo, setDeliveryInfo] = useState<DeliveryInfo | null>(null);

  useEffect(() => {
    const storedDeliveryInfo = localStorage.getItem('deliveryInfo');
    if (storedDeliveryInfo) {
      setDeliveryInfo(JSON.parse(storedDeliveryInfo));
    }
  }, []);

  if (!deliveryInfo) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Order not found</h1>
          <Link to="/" className="btn-primary">Back to Home</Link>
        </div>
      </div>
    );
  }

  const getDeliveryMethod = () => {
    return deliveryInfo.contactMethod === 'email' ? 'email' : 'SMS';
  };

  const getDeliveryAddress = () => {
    return deliveryInfo.contactMethod === 'email' 
      ? deliveryInfo.recipientEmail 
      : deliveryInfo.recipientPhone;
  };

  const getCardUrl = () => {
    return `${window.location.origin}/card/${deliveryInfo.uniqueCardId}`;
  };

  return (
    <div className="min-h-screen py-8 px-4 bg-gray-50">
      <div className="max-w-2xl mx-auto">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Thank You!</h1>
          <p className="text-xl text-gray-600">Your birthday card has been sent successfully</p>
        </div>

        {/* Order Confirmation */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-6">Order Confirmation</h2>
          
          <div className="space-y-6">
            {/* Delivery Status */}
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800 mb-1">Card Delivered</h3>
                <p className="text-gray-600">
                  Your birthday card has been successfully delivered to{' '}
                  <span className="font-medium text-gray-800">{deliveryInfo.cardData.recipientName}</span>
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  Delivery method: {getDeliveryMethod()}
                </p>
                <p className="text-sm text-gray-500">
                  Sent to: {getDeliveryAddress()}
                </p>
                {deliveryInfo.contactMethod === 'email' && (
                  <p className="text-sm text-gray-500">
                    Card URL: <a href={getCardUrl()} className="text-purple-600 hover:text-purple-700 underline" target="_blank" rel="noopener noreferrer">{getCardUrl()}</a>
                  </p>
                )}
              </div>
            </div>

            {/* Payment Confirmation */}
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800 mb-1">Payment Processed</h3>
                <p className="text-gray-600">Your payment of $1.00 has been successfully processed</p>
                <p className="text-sm text-gray-500 mt-1">Transaction completed securely</p>
              </div>
            </div>

            {/* Card Details */}
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800 mb-1">Card Details</h3>
                <div className="space-y-1 text-sm text-gray-600">
                  <p><span className="font-medium">From:</span> {deliveryInfo.cardData.senderName}</p>
                  <p><span className="font-medium">To:</span> {deliveryInfo.cardData.recipientName}</p>
                  <p><span className="font-medium">Message:</span> {deliveryInfo.cardData.message}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-xl font-semibold mb-4">What's Next?</h2>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs font-medium text-purple-600">1</span>
              </div>
              <div>
                <h3 className="font-medium text-gray-800">Recipient Notification</h3>
                <p className="text-sm text-gray-600">
                  {deliveryInfo.cardData.recipientName} will receive a notification about their birthday card
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs font-medium text-purple-600">2</span>
              </div>
              <div>
                <h3 className="font-medium text-gray-800">Card Access</h3>
                <p className="text-sm text-gray-600">
                  They can view and interact with the card through the link sent to their {getDeliveryMethod()}
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs font-medium text-purple-600">3</span>
              </div>
              <div>
                <h3 className="font-medium text-gray-800">Share & Celebrate</h3>
                <p className="text-sm text-gray-600">
                  The recipient can share the card with friends and family to spread the birthday joy
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="text-center space-y-4">
          <Link to="/" className="btn-primary inline-block">
            Send Another Card
          </Link>
          <div>
            <button 
              onClick={() => {
                // In a real app, this would share the order details
                alert('Order details copied to clipboard!');
              }}
              className="text-purple-600 hover:text-purple-700 font-medium"
            >
              Save Order Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardConfirmPage; 