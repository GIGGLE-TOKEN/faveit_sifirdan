import Head from 'next/head'

interface SEOProps {
  title: string
  description: string
  ogImage?: string
}

export function SEO({ title, description, ogImage }: SEOProps) {
  const siteTitle = 'Social Platform'
  const fullTitle = `${title} | ${siteTitle}`

  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      {ogImage && <meta property="og:image" content={ogImage} />}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      {ogImage && <meta name="twitter:image" content={ogImage} />}
    </Head>
  )
}

