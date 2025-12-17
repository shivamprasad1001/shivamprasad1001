import { useEffect } from 'react';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
}

const SEO: React.FC<SEOProps> = ({
  title = 'Shivam Prasad - AI/ML Developer & Innovator',
  description = 'AI/ML Developer specializing in Deep Learning, NLP, and LLMs. Building intelligent systems that bridge research with real-world applications.',
  keywords = 'AI Developer, Machine Learning, Deep Learning, NLP, LLM, Python, PyTorch, TensorFlow, Shivam Prasad',
  image = 'https://shivamprasad1001.vercel.app/shivam.png',
  url = 'https://shivamprasad1001.vercel.app/'
}) => {
  useEffect(() => {
    document.title = title;
    
    const metaTags = [
      { name: 'description', content: description },
      { name: 'keywords', content: keywords },
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:image', content: image },
      { property: 'og:url', content: url },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: image },
    ];

    metaTags.forEach(({ name, property, content }) => {
      const selector = name ? `meta[name="${name}"]` : `meta[property="${property}"]`;
      let element = document.querySelector(selector);
      
      if (!element) {
        element = document.createElement('meta');
        if (name) element.setAttribute('name', name);
        if (property) element.setAttribute('property', property);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    });
  }, [title, description, keywords, image, url]);

  return null;
};

export default SEO;
