'use client'

import { useState } from 'react'
import { Sparkles, Target, TrendingUp, Zap, Copy, Download, RefreshCw } from 'lucide-react'

interface AdCreative {
  headline: string
  subheadline: string
  body: string
  cta: string
  targetAudience: string
  tone: string
  platform: string
}

export default function Home() {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    product: '',
    target: '',
    platform: 'facebook',
    tone: 'professional',
    goal: 'conversions'
  })
  const [creatives, setCreatives] = useState<AdCreative[]>([])
  const [activeTab, setActiveTab] = useState('generate')

  const generateCreatives = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      const data = await response.json()
      setCreatives(data.creatives || [])
      setActiveTab('results')
    } catch (error) {
      console.error('Error generating creatives:', error)
    }
    setLoading(false)
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const exportCreatives = () => {
    const csvContent = creatives.map(c =>
      `"${c.headline}","${c.subheadline}","${c.body}","${c.cta}","${c.platform}","${c.tone}"`
    ).join('\n')
    const blob = new Blob([`Headline,Subheadline,Body,CTA,Platform,Tone\n${csvContent}`], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'ad-creatives.csv'
    a.click()
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Sparkles className="w-12 h-12 text-yellow-400 mr-3" />
            <h1 className="text-5xl font-bold text-white">Marketing Ads Creative Agent</h1>
          </div>
          <p className="text-xl text-purple-200">AI-Powered Ad Copy Generation for All Your Campaigns</p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex justify-center mb-8 space-x-4">
          <button
            onClick={() => setActiveTab('generate')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              activeTab === 'generate'
                ? 'bg-white text-purple-900 shadow-lg'
                : 'bg-purple-800 text-white hover:bg-purple-700'
            }`}
          >
            <Zap className="w-5 h-5 inline mr-2" />
            Generate Ads
          </button>
          <button
            onClick={() => setActiveTab('results')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              activeTab === 'results'
                ? 'bg-white text-purple-900 shadow-lg'
                : 'bg-purple-800 text-white hover:bg-purple-700'
            }`}
          >
            <Target className="w-5 h-5 inline mr-2" />
            Your Creatives ({creatives.length})
          </button>
        </div>

        {/* Generate Tab */}
        {activeTab === 'generate' && (
          <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl">
            <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
              <Sparkles className="w-8 h-8 mr-3 text-yellow-400" />
              Create Your Ad Campaign
            </h2>

            <div className="space-y-6">
              {/* Product/Service */}
              <div>
                <label className="block text-white font-semibold mb-2">Product or Service</label>
                <input
                  type="text"
                  value={formData.product}
                  onChange={(e) => setFormData({ ...formData, product: e.target.value })}
                  placeholder="e.g., Fitness App, Organic Skincare, SaaS Platform"
                  className="w-full px-4 py-3 rounded-lg bg-white/20 text-white placeholder-purple-300 border border-purple-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
              </div>

              {/* Target Audience */}
              <div>
                <label className="block text-white font-semibold mb-2">Target Audience</label>
                <input
                  type="text"
                  value={formData.target}
                  onChange={(e) => setFormData({ ...formData, target: e.target.value })}
                  placeholder="e.g., 25-35 year old professionals, fitness enthusiasts, small business owners"
                  className="w-full px-4 py-3 rounded-lg bg-white/20 text-white placeholder-purple-300 border border-purple-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Platform */}
                <div>
                  <label className="block text-white font-semibold mb-2">Platform</label>
                  <select
                    value={formData.platform}
                    onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-white/20 text-white border border-purple-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  >
                    <option value="facebook">Facebook</option>
                    <option value="instagram">Instagram</option>
                    <option value="google">Google Ads</option>
                    <option value="linkedin">LinkedIn</option>
                    <option value="twitter">Twitter/X</option>
                    <option value="tiktok">TikTok</option>
                  </select>
                </div>

                {/* Tone */}
                <div>
                  <label className="block text-white font-semibold mb-2">Tone</label>
                  <select
                    value={formData.tone}
                    onChange={(e) => setFormData({ ...formData, tone: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-white/20 text-white border border-purple-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  >
                    <option value="professional">Professional</option>
                    <option value="casual">Casual</option>
                    <option value="playful">Playful</option>
                    <option value="urgent">Urgent</option>
                    <option value="inspirational">Inspirational</option>
                    <option value="luxury">Luxury</option>
                  </select>
                </div>

                {/* Goal */}
                <div>
                  <label className="block text-white font-semibold mb-2">Campaign Goal</label>
                  <select
                    value={formData.goal}
                    onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-white/20 text-white border border-purple-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  >
                    <option value="conversions">Conversions</option>
                    <option value="awareness">Brand Awareness</option>
                    <option value="engagement">Engagement</option>
                    <option value="traffic">Traffic</option>
                    <option value="leads">Lead Generation</option>
                  </select>
                </div>
              </div>

              {/* Generate Button */}
              <button
                onClick={generateCreatives}
                disabled={loading || !formData.product || !formData.target}
                className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-purple-900 font-bold py-4 rounded-lg hover:from-yellow-500 hover:to-orange-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
                    Generating Your Ad Creatives...
                  </span>
                ) : (
                  <span className="flex items-center justify-center">
                    <Sparkles className="w-5 h-5 mr-2" />
                    Generate Ad Creatives
                  </span>
                )}
              </button>
            </div>

            {/* Features */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white/10 p-4 rounded-lg">
                <Target className="w-8 h-8 text-yellow-400 mb-2" />
                <h3 className="text-white font-semibold">Multiple Variations</h3>
                <p className="text-purple-200 text-sm">Get 5 unique ad variations per generation</p>
              </div>
              <div className="bg-white/10 p-4 rounded-lg">
                <TrendingUp className="w-8 h-8 text-yellow-400 mb-2" />
                <h3 className="text-white font-semibold">Platform Optimized</h3>
                <p className="text-purple-200 text-sm">Copy tailored for each platform's best practices</p>
              </div>
              <div className="bg-white/10 p-4 rounded-lg">
                <Zap className="w-8 h-8 text-yellow-400 mb-2" />
                <h3 className="text-white font-semibold">Instant Results</h3>
                <p className="text-purple-200 text-sm">AI-powered generation in seconds</p>
              </div>
            </div>
          </div>
        )}

        {/* Results Tab */}
        {activeTab === 'results' && (
          <div className="max-w-6xl mx-auto">
            {creatives.length === 0 ? (
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-12 text-center">
                <Sparkles className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-white mb-2">No Creatives Yet</h3>
                <p className="text-purple-200 mb-6">Generate your first ad campaign to see results here</p>
                <button
                  onClick={() => setActiveTab('generate')}
                  className="bg-gradient-to-r from-yellow-400 to-orange-500 text-purple-900 font-bold px-8 py-3 rounded-lg hover:from-yellow-500 hover:to-orange-600 transition-all"
                >
                  Start Creating
                </button>
              </div>
            ) : (
              <>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-3xl font-bold text-white">Your Ad Creatives</h2>
                  <button
                    onClick={exportCreatives}
                    className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-all flex items-center"
                  >
                    <Download className="w-5 h-5 mr-2" />
                    Export to CSV
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {creatives.map((creative, index) => (
                    <div key={index} className="bg-white/10 backdrop-blur-lg rounded-xl p-6 shadow-xl hover:shadow-2xl transition-all">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center space-x-2">
                          <span className="bg-yellow-400 text-purple-900 px-3 py-1 rounded-full text-sm font-bold">
                            #{index + 1}
                          </span>
                          <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm">
                            {creative.platform}
                          </span>
                        </div>
                        <button
                          onClick={() => copyToClipboard(`${creative.headline}\n${creative.subheadline}\n\n${creative.body}\n\n${creative.cta}`)}
                          className="text-yellow-400 hover:text-yellow-300 transition-colors"
                        >
                          <Copy className="w-5 h-5" />
                        </button>
                      </div>

                      <div className="space-y-3">
                        <div>
                          <h4 className="text-yellow-400 font-semibold text-sm mb-1">Headline</h4>
                          <p className="text-white font-bold text-xl">{creative.headline}</p>
                        </div>

                        <div>
                          <h4 className="text-yellow-400 font-semibold text-sm mb-1">Subheadline</h4>
                          <p className="text-purple-200 text-lg">{creative.subheadline}</p>
                        </div>

                        <div>
                          <h4 className="text-yellow-400 font-semibold text-sm mb-1">Body Copy</h4>
                          <p className="text-white">{creative.body}</p>
                        </div>

                        <div>
                          <h4 className="text-yellow-400 font-semibold text-sm mb-1">Call to Action</h4>
                          <p className="text-white font-semibold bg-gradient-to-r from-yellow-400 to-orange-500 inline-block px-4 py-2 rounded-lg text-purple-900">
                            {creative.cta}
                          </p>
                        </div>

                        <div className="pt-3 border-t border-purple-500/30">
                          <div className="flex justify-between text-sm">
                            <span className="text-purple-300">Tone: <span className="text-white">{creative.tone}</span></span>
                            <span className="text-purple-300">Target: <span className="text-white">{creative.targetAudience}</span></span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </main>
  )
}
