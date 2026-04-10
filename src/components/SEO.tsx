import { useEffect } from 'react';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
}

const SEO: React.FC<SEOProps> = ({
  title = 'Shivam Prasad - Aspiring AI/ML Researcher',
  description = 'Portfolio of Shivam Prasad, an aspiring AI/ML researcher focused on deep learning, NLP, computer vision, LLM systems, and collaborative research work.',
  keywords = 'Shivam Prasad, AI ML Researcher, Machine Learning, Deep Learning, NLP, Computer Vision, LLM, Research Paper, PyTorch, TensorFlow',
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
