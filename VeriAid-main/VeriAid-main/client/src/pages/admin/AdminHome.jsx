import React, { useState } from 'react';
import { CheckCircle, XCircle, MapPin, User, Calendar } from 'lucide-react';

const AdminPanel = () => {
  const [pendingPosts, setPendingPosts] = useState([
    {
      id: 1,
      title: "Critical Medical Surgery Needed",
      description: "My daughter needs immediate heart surgery. The local hospital lacks proper equipment. We're seeking help to transfer her to a specialized facility.",
      location: "Cairo, Egypt",
      author: "Ahmed Hassan",
      submittedAt: "2024-01-15 14:30",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=200&fit=crop"
    },
    {
      id: 2,
      title: "Family Displaced by Wildfire",
      description: "Our home and all belongings were destroyed in the recent wildfire. We need immediate assistance for shelter, clothing, and basic necessities for 4 family members.",
      location: "California, USA",
      author: "Sarah Mitchell",
      submittedAt: "2024-01-15 16:45",
      image: "https://images.unsplash.com/photo-1574201642806-71fd3395b25e?w=600&h=200&fit=crop"
    },
    {
      id: 3,
      title: "School Supplies After Tornado",
      description: "Local elementary school was severely damaged by tornado. 150 students need school supplies and learning materials to continue their education.",
      location: "Oklahoma, USA",
      author: "Michael Johnson",
      submittedAt: "2024-01-15 09:15",
      image: "https://images.unsplash.com/photo-1574201635302-388dd92a4c3f?w=600&h=200&fit=crop"
    },
    {
      id: 4,
      title: "Clean Water Access Emergency",
      description: "Village water supply contaminated after heavy flooding. 200 families urgently need clean drinking water and water purification supplies.",
      location: "Bangladesh",
      author: "Fatima Rahman",
      submittedAt: "2024-01-14 22:10",
      image: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=600&h=200&fit=crop"
    }
  ]);

  const [processingIds, setProcessingIds] = useState(new Set());

  const handleAction = async (postId, action) => {
    setProcessingIds(prev => new Set([...prev, postId]));
    
    // Simulate API call
    setTimeout(() => {
      setPendingPosts(prev => prev.filter(post => post.id !== postId));
      setProcessingIds(prev => {
        const newSet = new Set(prev);
        newSet.delete(postId);
        return newSet;
      });
      
      const actionText = action === 'approve' ? 'approved' : 'rejected';
      alert(`Post has been ${actionText} successfully!`);
    }, 1000);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 font-['Inter',sans-serif]">
      {/* Simple Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold text-blue-500">Dharma Admin</h1>
            <span className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full">
              Internal Use Only
            </span>
          </div>
          <div className="text-sm text-gray-500">
            {pendingPosts.length} items pending review
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Pending Verifications
          </h2>
          <p className="text-gray-600">
            Review and approve crisis relief requests before they go live
          </p>
        </div>

        {/* Posts List */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          {pendingPosts.length === 0 ? (
            <div className="p-8 text-center">
              <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">All caught up!</h3>
              <p className="text-gray-600">No pending posts to review at the moment.</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {pendingPosts.map((post, /*index*/) => (
                <div key={post.id} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex gap-4">
                    {/* Post Image */}
                    <div className="flex-shrink-0">
                      <img
                        src={post.image}
                        alt="Crisis situation"
                        className="w-24 h-24 object-cover rounded-lg border border-gray-200"
                      />
                    </div>
                    
                    {/* Post Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="text-lg font-semibold text-gray-900 leading-tight">
                          {post.title}
                        </h3>
                        <span className="text-sm text-gray-500 ml-4 flex-shrink-0">
                          #{post.id}
                        </span>
                      </div>
                      
                      <p className="text-gray-700 text-sm leading-relaxed mb-4 line-clamp-3">
                        {post.description}
                      </p>
                      
                      <div className="flex items-center gap-6 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          <span>{post.location}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <User className="h-4 w-4" />
                          <span>{post.author}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span>{formatDate(post.submittedAt)}</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="flex-shrink-0 flex gap-3 ml-4">
                      <button
                        onClick={() => handleAction(post.id, 'approve')}
                        disabled={processingIds.has(post.id)}
                        className="flex items-center gap-2 px-4 py-2.5 bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white font-medium text-sm rounded-lg transition-colors"
                      >
                        {processingIds.has(post.id) ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            Processing...
                          </>
                        ) : (
                          <>
                            <CheckCircle className="h-4 w-4" />
                            Approve
                          </>
                        )}
                      </button>
                      
                      <button
                        onClick={() => handleAction(post.id, 'reject')}
                        disabled={processingIds.has(post.id)}
                        className="flex items-center gap-2 px-3 py-2.5 bg-red-500 hover:bg-red-600 disabled:bg-gray-400 text-white font-medium text-sm rounded-lg transition-colors"
                      >
                        <XCircle className="h-4 w-4" />
                        <span className="hidden sm:inline">Reject</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick Stats */}
        {pendingPosts.length > 0 && (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="text-2xl font-bold text-gray-900">{pendingPosts.length}</div>
              <div className="text-sm text-gray-600">Pending Reviews</div>
            </div>
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="text-2xl font-bold text-green-600">0</div>
              <div className="text-sm text-gray-600">Approved Today</div>
            </div>
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="text-2xl font-bold text-red-600">0</div>
              <div className="text-sm text-gray-600">Rejected Today</div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminPanel;