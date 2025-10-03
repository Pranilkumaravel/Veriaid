import React from 'react';
import { useNavigate } from 'react-router-dom';

const Homepage = () => {
    const navigate=useNavigate()
  // Sample crisis posts data
  const crisisPosts = [
    {
      id: 1,
      user: {
        name: "Maria Santos",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
        location: "Manila, Philippines"
      },
      status: "verified",
      image: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=600&h=200&fit=crop",
      title: "Emergency Flood Relief - Family Lost Everything",
      description: "Our home was completely destroyed by the recent typhoon. We need urgent help for food, clean water, and temporary shelter for my family of 5.",
      progress: {
        current: 2450,
        target: 5000
      }
    },
    {
      id: 2,
      user: {
        name: "Ahmed Hassan",
        avatar: "https://images.unsplash.com/photo-1552058544-f2b08422138a?w=100&h=100&fit=crop&crop=face",
        location: "Cairo, Egypt"
      },
      status: "pending",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=200&fit=crop",
      title: "Critical Medical Surgery Needed",
      description: "My daughter needs immediate heart surgery. The local hospital lacks proper equipment. We're seeking help to transfer her to a specialized facility."
    },
    {
      id: 3,
      user: {
        name: "Elena Rodriguez",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616c669b4cf?w=100&h=100&fit=crop&crop=face",
        location: "Guatemala City, Guatemala"
      },
      status: "verified",
      image: "https://images.unsplash.com/photo-1574201635302-388dd92a4c3f?w=600&h=200&fit=crop",
      title: "Earthquake Survivors Need Shelter",
      description: "The 7.2 magnitude earthquake destroyed our community center that housed 30 families. We urgently need materials to build temporary housing.",
      progress: {
        current: 8200,
        target: 12000
      }
    },
    {
      id: 4,
      user: {
        name: "James Thompson",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
        location: "New Orleans, USA"
      },
      status: "verified",
      image: "https://images.unsplash.com/photo-1574201642806-71fd3395b25e?w=600&h=200&fit=crop",
      title: "Hurricane Recovery: School Rebuilding Fund",
      description: "Hurricane damaged our local elementary school. 200+ children have no place to learn. Help us rebuild classrooms and replace educational materials.",
      progress: {
        current: 15750,
        target: 25000
      }
    }
  ];

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const calculateProgress = (current, target) => {
    return Math.round((current / target) * 100);
  };

  const StatusBadge = ({ status }) => {
    const baseClasses = "ml-auto px-3 py-1 rounded-full text-xs font-medium";
    const statusClasses = {
      verified: "bg-green-100 text-green-800",
      pending: "bg-yellow-100 text-yellow-800"
    };

    return (
      <span className={`${baseClasses} ${statusClasses[status]}`}>
        {status === 'verified' ? 'Verified' : 'Pending'}
      </span>
    );
  };

  const ProgressBar = ({ current, target }) => {
    const percentage = calculateProgress(current, target);
    
    return (
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs text-slate-600">Progress</span>
          <span className="text-xs font-semibold text-slate-900">
            {formatCurrency(current)} of {formatCurrency(target)}
          </span>
        </div>
        <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-emerald-500 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    );
  };

  const CrisisCard = ({ post }) => {
    const isVerified = post.status === 'verified';
    
    return (
      <article className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-200 mb-6 overflow-hidden">
        {/* Card Header */}
        <div className="flex items-center p-6 pb-3 gap-3">
          <img 
            src={post.user.avatar} 
            alt={`${post.user.name} avatar`}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-semibold text-slate-900 truncate">
              {post.user.name}
            </h3>
            <p className="text-xs text-slate-600 truncate">
              📍 {post.user.location}
            </p>
          </div>
          <StatusBadge status={post.status} />
        </div>

        {/* Crisis Image */}
        <img 
          src={post.image} 
          alt="Crisis situation"
          className="w-full h-48 object-cover"
        />

        {/* Card Content */}
        <div className="p-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-2 leading-tight">
            {post.title}
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            {post.description}
          </p>
        </div>

        {/* Card Actions */}
        <div className="px-6 pb-6 border-t border-slate-100 pt-4">
          {isVerified && post.progress && (
            <ProgressBar 
              current={post.progress.current} 
              target={post.progress.target} 
            />
          )}
          <button 
            className={`w-full py-3 px-4 rounded-lg font-medium text-sm transition-colors ${
              isVerified 
                ? 'bg-orange-500 hover:bg-orange-600 text-white' 
                : 'bg-gray-400 text-gray-600 cursor-not-allowed'
            }`}
            disabled={!isVerified}
          >
            Support Now
          </button>
        </div>
      </article>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 font-['Inter',sans-serif]">
      {/* Fixed Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-white border-b border-slate-200 px-4 md:px-6 py-4 flex justify-between items-center z-50 shadow-sm">
        <a href="#" className="text-xl md:text-2xl font-bold text-blue-500 no-underline">
          Dharma
        </a>
        
        <div className="flex gap-2 md:gap-3 items-center">
          <a 
            href="#" 
            className="px-4 py-2.5 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium text-sm transition-colors no-underline"
          >
            Connect Wallet
          </a>
          <a 
            onClick={navigate('/new')}
            href="/new" 
            className="px-4 py-2.5 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-semibold text-sm transition-colors no-underline flex items-center gap-2"
          >
            <span className="hidden xs:inline">Create Need</span>
            <span className="xs:hidden text-lg font-bold">+</span>
          </a>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-20 md:pt-24 px-4 md:px-6 max-w-2xl mx-auto pb-8">
        <div className="space-y-0">
          {crisisPosts.map((post) => (
            <CrisisCard key={post.id} post={post} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Homepage;