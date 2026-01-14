import { NextRequest, NextResponse } from 'next/server'

interface AdCreative {
  headline: string
  subheadline: string
  body: string
  cta: string
  targetAudience: string
  tone: string
  platform: string
}

export async function POST(request: NextRequest) {
  try {
    const { product, target, platform, tone, goal } = await request.json()

    // Generate 5 different ad creative variations
    const creatives: AdCreative[] = generateCreatives(product, target, platform, tone, goal)

    return NextResponse.json({ creatives })
  } catch (error) {
    console.error('Error generating creatives:', error)
    return NextResponse.json({ error: 'Failed to generate creatives' }, { status: 500 })
  }
}

function generateCreatives(
  product: string,
  target: string,
  platform: string,
  tone: string,
  goal: string
): AdCreative[] {
  const variations = [
    {
      headlinePrefix: ['Discover', 'Transform Your', 'Unlock', 'Experience', 'Get'],
      bodyStarter: ['Ready to take your', 'Imagine a world where', 'What if you could', 'Join thousands who are', 'The secret to'],
      ctaOptions: ['Get Started Now', 'Learn More', 'Try It Free', 'Shop Now', 'Join Today']
    },
    {
      headlinePrefix: ['The Ultimate', 'Your Perfect', 'Premium', 'Revolutionary', 'Award-Winning'],
      bodyStarter: ['Designed for', 'Perfect for', 'Trusted by', 'Loved by', 'Recommended by'],
      ctaOptions: ['Start Free Trial', 'See How It Works', 'Get Your Deal', 'Claim Offer', 'Book Demo']
    },
    {
      headlinePrefix: ['Limited Time:', 'Exclusive:', 'New:', 'Finally:', "Don't Miss:"],
      bodyStarter: ['For a limited time,', 'This exclusive offer', 'Right now, you can', 'Today only,', 'Special offer:'],
      ctaOptions: ['Grab This Deal', 'Act Now', 'Get Instant Access', 'Claim Your Spot', 'Reserve Now']
    },
    {
      headlinePrefix: ['Why', 'How', 'The Best Way to', 'Stop', 'Start'],
      bodyStarter: ['You deserve', "It's time to", 'Never again', 'Say goodbye to', 'Welcome to'],
      ctaOptions: ['Find Out How', 'See Results', 'Get Started Free', 'Explore Now', 'Sign Up']
    },
    {
      headlinePrefix: ['Join', 'Meet', 'Trusted by', 'Used by', 'Loved by'],
      bodyStarter: ['Thousands of', 'Join the community of', 'Be part of', "See why everyone's", 'Discover what'],
      ctaOptions: ['Join the Community', 'Get Started', 'Try Risk-Free', 'Start Today', 'Learn More']
    }
  ]

  const platformSpecifics: Record<string, { charLimit: number; style: string }> = {
    facebook: { charLimit: 125, style: 'conversational and engaging' },
    instagram: { charLimit: 100, style: 'visual and trendy' },
    google: { charLimit: 90, style: 'direct and keyword-focused' },
    linkedin: { charLimit: 150, style: 'professional and value-driven' },
    twitter: { charLimit: 280, style: 'concise and punchy' },
    tiktok: { charLimit: 100, style: 'fun and authentic' }
  }

  const toneAdjustments: Record<string, { modifier: string; urgency: string }> = {
    professional: { modifier: 'industry-leading', urgency: 'schedule a consultation' },
    casual: { modifier: 'amazing', urgency: 'check it out' },
    playful: { modifier: 'super fun', urgency: 'dive in' },
    urgent: { modifier: 'time-sensitive', urgency: 'act now before it\'s gone' },
    inspirational: { modifier: 'life-changing', urgency: 'begin your journey' },
    luxury: { modifier: 'exclusive', urgency: 'experience excellence' }
  }

  const goalFocus: Record<string, string> = {
    conversions: 'drive immediate action with compelling offers',
    awareness: 'introduce the brand and build recognition',
    engagement: 'encourage likes, comments, and shares',
    traffic: 'get users to click through to website',
    leads: 'capture contact information'
  }

  return variations.map((variation, index) => {
    const platformSpec = platformSpecifics[platform] || platformSpecifics.facebook
    const toneAdj = toneAdjustments[tone] || toneAdjustments.professional

    const headline = `${variation.headlinePrefix[index % variation.headlinePrefix.length]} ${product}`
    const subheadline = `Perfect for ${target} | ${toneAdj.modifier}`

    let body = `${variation.bodyStarter[index % variation.bodyStarter.length]} ${target} are loving ${product}. `

    if (goal === 'conversions') {
      body += `Get exclusive access with limited-time pricing. `
    } else if (goal === 'awareness') {
      body += `Discover why we're the trusted choice for thousands. `
    } else if (goal === 'engagement') {
      body += `Join the conversation and share your story. `
    } else if (goal === 'traffic') {
      body += `Visit our site to learn more about what makes us different. `
    } else {
      body += `Sign up for free resources and expert insights. `
    }

    body += `✨ ${toneAdj.modifier.charAt(0).toUpperCase() + toneAdj.modifier.slice(1)} solution for ${target}`

    const cta = variation.ctaOptions[index % variation.ctaOptions.length]

    return {
      headline: headline.slice(0, 60),
      subheadline: subheadline.slice(0, 80),
      body: body.slice(0, platformSpec.charLimit * 2),
      cta,
      targetAudience: target,
      tone,
      platform
    }
  })
}
