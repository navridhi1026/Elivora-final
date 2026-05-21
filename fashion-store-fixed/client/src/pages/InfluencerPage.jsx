import React, { useState } from 'react'
import { Upload, Play, Heart, MessageCircle, Share2, TrendingUp, Video } from 'react-feather'
import PageHeader from '../components/PageHeader'
import Button from '../components/Button'
import Container from '../components/Container'

// Demo influencer posts
const demoInfluencerPosts = [
  {
    id: 1,
    userName: "fashionista_sara",
    userAvatar: "https://api.dicebear.com/7.x/initials/svg?seed=Sara",
    videoThumbnail: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400",
    product: "Summer Floral Dress",
    likes: 1234,
    comments: 89,
    caption: "Absolutely love this dress! Perfect for summer vibes 🌸",
    verified: true
  },
  {
    id: 2,
    userName: "style_with_alex",
    userAvatar: "https://api.dicebear.com/7.x/initials/svg?seed=Alex",
    videoThumbnail: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400",
    product: "Casual Denim Jacket",
    likes: 2156,
    comments: 134,
    caption: "This jacket is everything! So versatile ✨",
    verified: true
  },
  {
    id: 3,
    userName: "trendy_mia",
    userAvatar: "https://api.dicebear.com/7.x/initials/svg?seed=Mia",
    videoThumbnail: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400",
    product: "Evening Gown",
    likes: 3421,
    comments: 201,
    caption: "Red carpet ready! Thank you @Elivora 💃",
    verified: true
  },
  {
    id: 4,
    userName: "chic_emma",
    userAvatar: "https://api.dicebear.com/7.x/initials/svg?seed=Emma",
    videoThumbnail: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400",
    product: "Business Casual Set",
    likes: 1876,
    comments: 92,
    caption: "Boss babe vibes 💼✨",
    verified: false
  }
]

export default function InfluencerPage() {
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [uploadData, setUploadData] = useState({
    video: null,
    caption: '',
    productTag: ''
  })

  const handleVideoUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      setUploadData({...uploadData, video: file})
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    alert('Video uploaded successfully! It will be reviewed and posted soon.')
    setShowUploadModal(false)
    setUploadData({ video: null, caption: '', productTag: '' })
  }

  return (
    <main className="my-14">
      <PageHeader>Influencer Gallery</PageHeader>
      
      <Container>
        {/* Header Section */}
        <div className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white rounded-xl p-8 mb-8 text-center">
          <TrendingUp className="w-12 h-12 mx-auto mb-4" />
          <h2 className="text-3xl font-bold mb-2">Style Inspiration from Our Community</h2>
          <p className="text-lg mb-6 opacity-90">
            See how real customers style their Elivora outfits
          </p>
          <Button 
            onClick={() => setShowUploadModal(true)}
            className="bg-white text-purple-600 hover:bg-gray-100"
          >
            <Upload className="mr-2" />
            Share Your Style
          </Button>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow p-4 text-center">
            <p className="text-3xl font-bold text-purple-600">2.5K+</p>
            <p className="text-gray-600 text-sm">Style Videos</p>
          </div>
          <div className="bg-white rounded-lg shadow p-4 text-center">
            <p className="text-3xl font-bold text-pink-600">500K+</p>
            <p className="text-gray-600 text-sm">Total Views</p>
          </div>
          <div className="bg-white rounded-lg shadow p-4 text-center">
            <p className="text-3xl font-bold text-indigo-600">150+</p>
            <p className="text-gray-600 text-sm">Influencers</p>
          </div>
        </div>

        {/* Influencer Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {demoInfluencerPosts.map(post => (
            <InfluencerCard key={post.id} post={post} />
          ))}
        </div>

        {/* Upload Modal */}
        {showUploadModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold">Share Your Style Video</h3>
                <button 
                  onClick={() => setShowUploadModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleSubmit}>
                {/* Video Upload */}
                <div className="mb-6">
                  <label className="block text-gray-700 font-semibold mb-2">
                    Upload Video *
                  </label>
                  <label className="cursor-pointer">
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-purple-500 transition">
                      {uploadData.video ? (
                        <div>
                          <p className="text-green-600 font-medium">
                            ✓ {uploadData.video.name}
                          </p>
                          <p className="text-sm text-gray-500 mt-2">Click to change</p>
                        </div>
                      ) : (
                        <div>
                          <Upload className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                          <p className="text-gray-600">Click to upload video</p>
                          <p className="text-sm text-gray-400 mt-1">MP4, MOV up to 100MB</p>
                        </div>
                      )}
                    </div>
                    <input 
                      type="file" 
                      accept="video/*" 
                      onChange={handleVideoUpload}
                      className="hidden"
                      required
                    />
                  </label>
                </div>

                {/* Caption */}
                <div className="mb-6">
                  <label className="block text-gray-700 font-semibold mb-2">
                    Caption *
                  </label>
                  <textarea
                    value={uploadData.caption}
                    onChange={(e) => setUploadData({...uploadData, caption: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    rows="3"
                    placeholder="Tell us about your style..."
                    required
                  />
                </div>

                {/* Product Tag */}
                <div className="mb-6">
                  <label className="block text-gray-700 font-semibold mb-2">
                    Tag Product (Optional)
                  </label>
                  <input
                    type="text"
                    value={uploadData.productTag}
                    onChange={(e) => setUploadData({...uploadData, productTag: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Product name from your order"
                  />
                </div>

                {/* Guidelines */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                  <p className="text-sm text-blue-800">
                    <strong>Guidelines:</strong>
                  </p>
                  <ul className="text-sm text-blue-700 mt-2 space-y-1 list-disc list-inside">
                    <li>Only upload videos wearing Elivora products</li>
                    <li>Keep content appropriate and respectful</li>
                    <li>Videos will be reviewed before publishing</li>
                  </ul>
                </div>

                {/* Submit Button */}
                <div className="flex gap-4">
                  <Button type="submit" className="flex-1">
                    Submit Video
                  </Button>
                  <Button 
                    type="button"
                    secondary 
                    onClick={() => setShowUploadModal(false)}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}
      </Container>
    </main>
  )
}

function InfluencerCard({ post }) {
  const [liked, setLiked] = useState(false)

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
      {/* Video Thumbnail */}
      <div className="relative aspect-[9/16] bg-gray-200">
        <img 
          src={post.videoThumbnail} 
          alt={post.product}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20 hover:bg-opacity-30 transition cursor-pointer">
          <Play className="w-16 h-16 text-white" fill="white" />
        </div>
        {post.verified && (
          <div className="absolute top-2 right-2 bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
            ✓ Verified
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        {/* User Info */}
        <div className="flex items-center mb-3">
          <img 
            src={post.userAvatar} 
            alt={post.userName}
            className="w-10 h-10 rounded-full mr-3"
          />
          <div className="flex-1">
            <p className="font-semibold text-sm">@{post.userName}</p>
            <p className="text-xs text-gray-500">{post.product}</p>
          </div>
        </div>

        {/* Caption */}
        <p className="text-sm text-gray-700 mb-3 line-clamp-2">
          {post.caption}
        </p>

        {/* Actions */}
        <div className="flex items-center gap-4 text-gray-600">
          <button 
            onClick={() => setLiked(!liked)}
            className="flex items-center gap-1 hover:text-red-500 transition"
          >
            <Heart 
              className={`w-5 h-5 ${liked ? 'fill-current text-red-500' : ''}`}
            />
            <span className="text-sm">{liked ? post.likes + 1 : post.likes}</span>
          </button>
          <button className="flex items-center gap-1 hover:text-blue-500 transition">
            <MessageCircle className="w-5 h-5" />
            <span className="text-sm">{post.comments}</span>
          </button>
          <button className="flex items-center gap-1 hover:text-green-500 transition ml-auto">
            <Share2 className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  )
}
