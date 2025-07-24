// /data/blogPosts.ts
export interface BlogPost {
    slug: string;
    title: string;
    metaDesc: string;
    coverImg: string;
    altText: string;
    content: string;
  }
  
  export const blogPosts: BlogPost[] = [
    {
      slug: "personalized-gift-ideas-every-occasion-2025",
      title: "Best Gift Ideas 2025: Ultimate Guide to the Personalized Gift",
      metaDesc:
        "Find the perfect personalized gift for 2025! Discover unique gift ideas to personalize and show you care. The ultimate guide to a thoughtful gift!",
      coverImg: "/images/personalized-gifts-2025.jpg",
      altText:
        "Personalized gift items like e-gift cards, gift cards, prizes jewelry, and photo frames",
      content: `
        <h1 class="text-3xl font-bold mb-4 text-purple-700">The Ultimate Guide to Personalized Gift Ideas for Every Occasion 2025</h1>
        <p class="mb-4">Digital gift cards are changing the way we celebrate! Whether it's <strong>gaming</strong>, <strong>shopping</strong>, or <strong>food</strong>, we’ve got something special for you.</p>
        <p class="mb-4">In this guide we cover everything — from <a href="/blog/personalized-gift-ideas-for-boyfriend" class="text-purple-600 underline">gift ideas for your boyfriend</a> to <a href="/blog/last-minute-personalized-gifts" class="text-purple-600 underline">last-minute surprises</a>.</p>
        <img src="/images/personalized-gifts-2025.jpg" alt="Personalized gift items like mugs, jewelry, and photo frames" class="rounded-xl my-6 shadow-lg"/>
        <h2 class="text-2xl font-semibold mb-2 text-purple-700">Why Personalized Digital Gift Cards?</h2>
        <ul class="list-disc pl-6 mb-4">
          <li>Instant delivery & secure</li>
          <li>Works for gaming, food, and shopping</li>
          <li>Customizable with your message</li>
        </ul>
        <p class="mb-4">Also explore these topics:</p>
        <ul class="list-disc pl-6 mb-4">
          <li><a href="/blog/choose-photo-for-personalized-gift" class="text-purple-600 underline">How to choose a photo for a personalized gift</a></li>
          <li><a href="/blog/are-personalized-gifts-worth-it" class="text-purple-600 underline">Are personalized gifts worth it?</a></li>
          <li><a href="/blog/long-distance-relationship-gift-ideas" class="text-purple-600 underline">Long-distance relationship gift ideas</a></li>
          <li><a href="/blog/affordable-personalized-gift-ideas" class="text-purple-600 underline">Affordable personalized gift ideas</a></li>
          <li><a href="/blog/custom-pet-gift-ideas" class="text-purple-600 underline">Custom pet gift ideas</a></li>
          <li><a href="/blog/luxury-looking-personalized-gifts" class="text-purple-600 underline">Luxury-looking personalized gifts</a></li>
        </ul>
        <p class="mt-6 text-purple-700 font-medium">💜 Make every occasion unforgettable with our digital gift cards.</p>
      `,
    },
  ];
  