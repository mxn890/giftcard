
export interface GiftCardData {
  id: string;
  title: string;
  description: string;
  image: string;
  rating: number;
  originalPrice: number;
  salePrice: number;
  category: string;
  popular?: boolean;
  discount?: number;
  amounts: number[];
  fullDescription: string;
}

export const giftCardsData: GiftCardData[] = [
  {
    id: '1',
    title: 'Apple Gift Card',
    description: 'Shop Apple’s App Store for Apps and Games, pay for subscriptions, and unlock Apple’s digital library',
    fullDescription: 'An Apple Gift Card (also known as a US iTunes gift card) allows you to shop Apple’s App Store for Apps and Games, pay for subscriptions, and unlock all of Apple’s digital library of TV shows, movies, music and books! You can even pay for other services such as Hulu and Disney+ right from your Apple account.',
    image: '/cards/apple.png',
    rating: 5,
    originalPrice: 200,
    salePrice: 195,
    category: 'entertainment',
    popular: true,
    amounts: [15, 25, 50, 100, 200]
  },
  {
    id: '2',
    title: 'Razer Gold Gift Card',
    description: 'Buy games, virtual currencies, gaming hardware and apparel on Razer.com',
    fullDescription: 'With a US Razer Gold Gift Card, you can buy games, virtual currencies, gaming hardware (such as laptops), and apparel on Razer.com.',
    image: '/cards/gold.png',
    rating: 4,
    originalPrice: 200,
    salePrice: 195,
    category: 'gaming',
    amounts: [20, 50, 75, 100, 200]
  },
  {
    id: '3',
    title: 'Hulu Gift Card',
    description: 'Unlock the full US Hulu catalog and pay for premium services',
    fullDescription: 'Unlock the full US Hulu catalog with a US Hulu gift card. This will allow you to upgrade and pay for Hulu premium services such as Hulu (No Ads), Hulu TV, Disney+ and ESPN+.',
    image: '/cards/hulu.png',
    rating: 4,
    originalPrice: 100,
    salePrice: 95,
    category: 'streaming',
    amounts: [25, 50, 100]
  },
  {
    id: '4',
    title: 'PlayStation Gift Card',
    description: 'Access the entire catalog of the United States PSN Store',
    fullDescription: 'Use this PSN gift card to access the entire catalog of the United States PSN Store. Buy new games, in-game upgrades, movies, TV shows, and other digital content!',
    image: '/cards/pss.png',
    rating: 5,
    originalPrice: 200,
    salePrice: 195,
    category: 'gaming',
    popular: true,
    amounts: [25, 50, 75, 100, 200]
  },
  {
    id: '5',
    title: 'Steam Gift Card',
    description: 'Add funds to your Steam wallet to access over 50,000 games',
    fullDescription: 'Easily add funds to your Steam wallet with a US Steam gift card. Instantly access over 50,000 games on Steam and get your game on!',
    image: '/cards/steam1.png',
    rating: 5,
    originalPrice: 200,
    salePrice: 195,
    category: 'gaming',
    amounts: [20, 50, 75, 100, 200]
  },
  {
    id: '6',
    title: 'Amazon Gift Card',
    description: 'Shop the endless online catalog of Amazon.com',
    fullDescription: 'Amazon Gift Cards are the perfect way to give them exactly what they want. Recipients can choose from millions of items storewide with no fees or expiration date.',
    image: '/cards/amazon1.png',
    rating: 5,
    originalPrice: 200,
    salePrice: 195,
    category: 'shopping',
    popular: true,
    amounts: [25, 50, 100, 150, 200]
  },
  {
    id: '7',
    title: 'Spotify Gift Card',
    description: 'Upgrade to Spotify Premium for ad-free, hi-def streaming',
    fullDescription: 'Unlock all of Spotify with a US Spotify Gift Card. Use this to upgrade to premium and enjoy ad-free streaming, offline listening, and unlimited skips.',
    image: '/cards/spotify.png',
    rating: 4,
    originalPrice: 60,
    salePrice: 55,
    category: 'music',
    amounts: [10, 30, 60]
  },
  {
    id: '8',
    title: 'Xbox Gift Card',
    description: 'Add funds to your Microsoft Account for games and subscriptions',
    fullDescription: 'Add funds to your Microsoft Account for use in the Microsoft Store on PCs or Xbox. Buy games, DLC, movies, and subscribe to Xbox Game Pass or Xbox Live Gold.',
    image: '/cards/xbox.png',
    rating: 4,
    originalPrice: 100,
    salePrice: 95,
    category: 'gaming',
    amounts: [15, 25, 50, 100]
  },
  {
    id: '9',
    title: 'Netflix Gift Card',
    description: 'Subscribe to Netflix streaming services',
    fullDescription: 'Use this US Netflix Gift Card to subscribe to Netflix plans: Basic ($6.99/mo), Standard HD ($15.49/mo), or Premium Ultra HD ($22.99/mo).',
    image: '/cards/netflix.png',
    rating: 5,
    originalPrice: 100,
    salePrice: 95,
    category: 'streaming',
    popular: true,
    amounts: [30, 60, 100]
  },
  {
    id: '10',
    title: 'Uber Gift Card',
    description: 'Pay for rides or Uber Eats orders',
    fullDescription: 'Load up your Uber account balance easily with a US Uber gift card and pay for rides through Uber’s mobile app. Can also be used for Uber Eats.',
    image: '/cards/uber.png',
    rating: 4,
    originalPrice: 200,
    salePrice: 195,
    category: 'transport',
    amounts: [20, 40, 80, 120, 200]
  },
  // Additional cards...
  {
    id: '11',
    title: 'Roblox Gift Card',
    description: 'Purchase Robux (virtual currency) and Premium subscriptions',
    fullDescription: 'Use Roblox Gift Cards to purchase Robux (the virtual currency on Roblox) and get additional in-game content or upgrade your avatar with cool items.',
    image: '/cards/roblox.png',
    rating: 4,
    originalPrice: 100,
    salePrice: 95,
    category: 'gaming',
    amounts: [10, 25, 50, 100]
  },
  {
    id: '12',
    title: 'Google Play Gift Card',
    description: 'Add funds to purchase Apps, Games, Books, Movies and subscriptions',
    fullDescription: 'Add funds to your Google Play account without a credit card. Use your balance to purchase Apps, Games, Books, Movies, YouTube, Newsstand, and subscriptions.',
    image: '/cards/goggleplay.png',
    rating: 4,
    originalPrice: 200,
    salePrice: 195,
    category: 'entertainment',
    amounts: [15, 25, 50, 100, 200]
  },
  {
    id: '13',
    title: 'Nintendo eShop Gift Card',
    description: 'Pay for games, apps, and upgrades in the US Nintendo eShop',
    fullDescription: 'Pay for your games, apps, upgrades and more in the US Nintendo eShop store with a US eShop gift card. Get access to exclusive games and discounts when you shop the US store.',
    image: '/cards/nintendo.png',
    rating: 4,
    originalPrice: 50,
    salePrice: 48,
    category: 'gaming',
    amounts: [10, 20, 35, 50]
  },
  {
    id: '14',
    title: 'Binance USDC Gift Card',
    description: 'Redeem for USDC stablecoin to trade on Binance',
    fullDescription: 'Redeem this Binance gift card for USDC—a trusted stablecoin backed 1:1 by the US Dollar. Your USDC gift card gives you a reliable way to store value or start trading instantly on Binance.',
    image: '/cards/binance.png',
    rating: 4,
    originalPrice: 150,
    salePrice: 145,
    category: 'crypto',
    amounts: [50, 100, 150]
  },
  {
    id: '15',
    title: 'Walmart Gift Card',
    description: 'Shop for everything at Walmart stores and online',
    fullDescription: 'Use this Walmart gift card to add balance to your Walmart account and buy products on Walmart.com.',
    image: '/cards/walmart.png',
    rating: 4,
    originalPrice: 200,
    salePrice: 195,
    category: 'shopping',
    amounts: [50, 100, 150, 200]
  },
  {
    id: '16',
    title: 'DoorDash Gift Card',
    description: 'Get food delivered with DoorDash app',
    fullDescription: 'Use this US DoorDash Gift Card to get your favorite food delivered with DoorDash app! Add money to your account to pay balances on orders from restaurants.',
    image: '/cards/door.png',
    rating: 4,
    originalPrice: 200,
    salePrice: 195,
    category: 'food',
    amounts: [50, 100, 150, 200]
  },
  {
    id: '17',
    title: 'Sephora Gift Card',
    description: 'Shop beauty products on Sephora.com with free shipping',
    fullDescription: 'Use a Sephora Gift Card on Sephora.com and get FREE 3-day shipping on all your Sephora.com orders!',
    image: '/cards/sephora.png',
    rating: 4,
    originalPrice: 250,
    salePrice: 245,
    category: 'beauty',
    amounts: [25, 50, 100, 200, 250]
  },
  {
    id: '18',
    title: 'Target Gift Card',
    description: 'Shop Target stores and website for best deals',
    fullDescription: 'Shop Target Gift Card and access to their website and get the best deals online! Valid only for United States Target’s Stores.',
    image: '/cards/target.png',
    rating: 4,
    originalPrice: 200,
    salePrice: 195,
    category: 'shopping',
    amounts: [50, 75, 100, 150, 200]
  },
  {
    id: '19',
    title: 'IMVU Gift Card',
    description: 'Buy credits to style your virtual avatar',
    fullDescription: 'Start with a standard avatar and customize it with your interest, makeup, dress up, and create it however you want! Use this US IMVU gift card to buy more IMVU credits.',
    image: '/cards/imvu.png',
    rating: 3,
    originalPrice: 50,
    salePrice: 48,
    category: 'virtual',
    amounts: [10, 25, 50]
  },
  {
    id: '20',
    title: 'Shein Gift Card',
    description: 'Shop trendy fashion on Shein website',
    fullDescription: 'Shein gift card allows you to get your favorite Shein products on their website. *Valid only for Shein Saudi Arabia, United Arab Emirates, Oman, Kuwait, Qatar and Bahrain.',
    image: '/cards/sheinn.png',
    rating: 3,
    originalPrice: 100,
    salePrice: 95,
    category: 'fashion',
    amounts: [25, 50, 100]
  },
  {
    id: '21',
    title: 'Victoria\'s Secret Gift Card',
    description: 'Shop lingerie and beauty products',
    fullDescription: 'Victoria’s Secret gift card allows you to get your favorite Victoria’s Secret products on their website. Perfect for birthdays and holidays.',
    image: '/cards/victoriassecret.png',
    rating: 4,
    originalPrice: 200,
    salePrice: 195,
    category: 'fashion',
    amounts: [50, 75, 100, 150, 200]
  },
  {
    id: '22',
    title: 'Nike Gift Card',
    description: 'Shop Nike products and athletic wear',
    fullDescription: 'Use this Nike Gift Card to add balance to your Nike account and buy your favorite Nike products.',
    image: '/cards/nike.png',
    rating: 5,
    originalPrice: 250,
    salePrice: 245,
    category: 'sports',
    amounts: [50, 100, 150, 200, 250]
  },
  {
    id: '23',
    title: 'Southwest Gift Card',
    description: 'Give the gift of flight with Southwest Airlines',
    fullDescription: 'Give the gift of flight, or send this card to someone to go explore! This Southwest Gift Card does not expire.',
    image: '/cards/souuthwest.png',
    rating: 4,
    originalPrice: 200,
    salePrice: 195,
    category: 'travel',
    amounts: [50, 100, 200]
  },
  {
    id: '24',
    title: 'Paramount+ Gift Card',
    description: 'Pay for your Paramount+ streaming subscription',
    fullDescription: 'Pay for your Paramount+ subscription with ease using this official gift card. Stream thousands of TV episodes, movies, live sports, and exclusive originals.',
    image: '/cards/paramount.png',
    rating: 4,
    originalPrice: 200,
    salePrice: 195,
    category: 'streaming',
    amounts: [25, 50, 100, 150, 200]
  },
  {
    id: '25',
    title: 'Uber Eats Gift Card',
    description: 'Get food delivered with Uber Eats',
    fullDescription: 'Use this Uber Eats Gift Card to get your favorite food delivered with Uber Eats! Add money to your account to pay for restaurant orders.',
    image: '/cards/ubereats.png',
    rating: 4,
    originalPrice: 100,
    salePrice: 95,
    category: 'food',
    amounts: [15, 25, 50, 100]
  },
  {
    id: '26',
    title: 'VUDU Gift Card',
    description: 'Rent or buy movies and TV shows on VUDU',
    fullDescription: 'Add balance to your VUDU Account with a VUDU gift card, pay for upgrades, and watch your favorite movies and TV shows on VUDU.com.',
    image: '/cards/v.png',
    rating: 3,
    originalPrice: 100,
    salePrice: 95,
    category: 'entertainment',
    amounts: [25, 50, 100]
  },
  {
    id: '27',
    title: 'CashtoCode Gift Card',
    description: 'Pay online without credit card (US version)',
    fullDescription: 'Pay easily and securely online without a credit card or bank with a US CashtoCode Gift Card.',
    image: '/cards/cashtocode.png',
    rating: 3,
    originalPrice: 100,
    salePrice: 95,
    category: 'finance',
    amounts: [10, 25, 50, 100]
  },
  {
    id: '28',
    title: 'Prepaid Mastercard',
    description: 'Use anywhere Mastercard is accepted online/offline',
    fullDescription: 'Use this US Prepaid Mastercard Gift Card to make online purchases anywhere Mastercard USD cards are accepted online and offline.',
    image: '/cards/mastercard.png',
    rating: 4,
    originalPrice: 200,
    salePrice: 195,
    category: 'finance',
    amounts: [50, 100, 150, 200]
  },
  {
    id: '29',
    title: 'Rewarble Gift Card',
    description: 'Fund your Rewarble wallet for online purchases',
    fullDescription: 'Redeem this gift card to immediately fund your Rewarble account, the new generation for online wallets. Use your balance on multiple websites worldwide.',
    image: '/cards/rewareable.png',
    rating: 3,
    originalPrice: 200,
    salePrice: 195,
    category: 'finance',
    amounts: [25, 50, 100, 150, 200]
  },

 
  
  {
    id: '34',
    title: 'Fandango Gift Card',
    description: 'Purchase movie tickets from Fandango',
    fullDescription: 'Add balance to your Fandango account to use on the Fandango website or mobile app to purchase movie tickets from Fandango.',
    image: '/cards/fandango.png',
    rating: 3,
    originalPrice: 50,
    salePrice: 48,
    category: 'entertainment',
    amounts: [25, 50]
  },
 
  {
    id: '37',
    title: 'SiriusXM Gift Card',
    description: 'Upgrade to commercial-free music and talk radio',
    fullDescription: 'Use this SiriusXM Gift Card to upgrade to commercial-free music, sports radio, talk news, and countless hours of streaming entertainment.',
    image: '/cards/siriusxm.png',
    rating: 3,
    originalPrice: 30,
    salePrice: 28,
    category: 'music',
    amounts: [15, 30]
  },
  {
    id: '38',
    title: 'Home Depot Gift Card',
    description: 'Shop furniture and home essentials',
    fullDescription: 'Shop Home Depot Gift Card and access to their website to get your favorite furniture and home essentials right away! Valid only for Home Depot Gift United States Stores.',
    image: '/cards/home.png',
    rating: 4,
    originalPrice: 200,
    salePrice: 195,
    category: 'home',
    amounts: [50, 75, 100, 150, 200]
  },
  {
    id: '39',
    title: 'Nordstrom Gift Card',
    description: 'Shop top brands worldwide',
    fullDescription: 'Shop Nordstrom Gift Card and access to their website to get your favorite items from the top brands worldwide right away!.',
    image: '/cards/nordstrom.png',
    rating: 4,
    originalPrice: 200,
    salePrice: 195,
    category: 'fashion',
    amounts: [50, 75, 100, 150, 200]
  },
  
  {
    id: '41',
    title: 'eBay Gift Card',
    description: 'Shop millions of items on eBay.com',
    fullDescription: 'Use this US eBay gift card to shop millions of items on eBay.com—from electronics and collectibles to fashion and home goods. A fast, secure way to pay on the world’s largest online marketplace.',
    image: '/cards/ebay.png',
    rating: 5,
    originalPrice: 200,
    salePrice: 195,
    category: 'shopping',
    popular: true,
    amounts: [25, 50, 75, 100, 200]
  },
  {
    id: '42',
    title: 'US Airbnb Gift Card',
    description: 'Book hotels and restaurants worldwide',
    fullDescription: 'Book anywhere using the Airbnb app. Get access to thousands of hotels and restaurants! Buy a US Airbnb gift card today and enjoy your travels with us!',
    image: '/cards/airbnb.png',
    rating: 5,
    originalPrice: 200,
    salePrice: 195,
    category: 'travel',
    popular: true,
    amounts: [25, 50, 100, 150, 200]
  },
  {
    id: '43',
    title: 'Adidas Gift Card',
    description: 'Shop your favorite Adidas products',
    fullDescription: 'Use this US Adidas Gift Card to add balance to your Adidas account and buy your favorite Adidas products.',
    image: '/cards/adidas.png',
    rating: 4,
    originalPrice: 250,
    salePrice: 245,
    category: 'shopping ',
    amounts: [50, 100, 150, 200, 250]
  },
  {
    id: '44',
    title: 'Southwest Gift Card',
    description: 'Give the gift of flight with no expiration date',
    fullDescription: 'Give the gift of flight, or send this card to someone to go explore! This Southwest Gift Card does not expire.',
    image: '/cards/souuthwest.png',
    rating: 4,
    originalPrice: 200,
    salePrice: 195,
    category: 'travel',
    amounts: [50, 100, 200]
  },
  
  {
    id: '46',
    title: 'Disney+ Gift Card',
    description: 'Stream Disney, Pixar, Marvel and Star Wars content',
    fullDescription: 'Stream Disney, Pixar, Marvel, Star Wars, Nat Geo with a Disney+ gift card. Plans start at $7.99/mo for streaming with ads, or jump to $13.99/mo for plans without ads and offline streaming.',
    image: '/cards/ds.png',
    rating: 5,
    originalPrice: 100,
    salePrice: 95,
    category: 'streaming',
    popular: true,
    amounts: [50, 100]
  },
  
  {
    id: '48',
    title: 'Hotels.com Gift Card',
    description: 'Book thousands of hotels worldwide',
    fullDescription: 'Book anywhere using the Hotels App or the Hotels.com website. Get access to thousands of hotels using a Hotels gift card today and enjoy your travels with us!',
    image: '/cards/hotels.png',
    rating: 4,
    originalPrice: 100,
    salePrice: 95,
    category: 'travel',
    amounts: [25, 50, 100]
  },
  
  {
    id: '50',
    title: 'Tidal Gift Card',
    description: 'Purchase Tidal Premium subscriptions',
    fullDescription: 'Use this Tidal Gift Card to purchase Tidal Premium subscriptions to enjoy ad-free music, offline playing, and create and share your favorite music with friends.',
    image: '/cards/tidal.png',
    rating: 3,
    originalPrice: 120,
    salePrice: 115,
    category: 'music',
    amounts: [20, 60, 120]
  },
  
  {
    id: '52',
    title: 'Garena Free Fire Gift Card',
    description: 'Get diamonds for skins and weapons',
    fullDescription: 'Redeem it on your Garena Free Fire to obtain diamonds and use it on your game! Get your favorite skins, weapons, and more with this gift card!',
    image: '/cards/f.png',
    rating: 3,
    originalPrice: 20,
    salePrice: 19,
    category: 'gaming',
    amounts: [10, 20]
  },
  {
    id: '53',
    title: 'Athleta Gift Card',
    description: 'Shop athletic wear and fitness products',
    fullDescription: 'Athleta gift card allows you to get your favorite Athleta products on their website. Perfect for fitness enthusiasts and athletes.',
    image: '/cards/athleta.png',
    rating: 4,
    originalPrice: 200,
    salePrice: 195,
    category: 'sports',
    amounts: [50, 75, 100, 150, 200]
  },
  
  {
    id: '55',
    title: 'Valorant Riot Points Gift Card',
    description: 'Unlock champions and skins for North American servers',
    fullDescription: 'Using Riot Points in Valorant is the best way to enhance your gaming experience. Use a US Valorant Gift Card to unlock new champions, exciting skins, boosts and more. *For use on North American servers only.',
    image: '/cards/val.png',
    rating: 4,
    originalPrice: 100,
    salePrice: 95,
    category: 'gaming',
    amounts: [10, 25, 50, 100]
  },
  {
    id: '56',
    title: 'Runescape Gift Card',
    description: 'Unlock Membership, RuneCoin, and Key packages',
    fullDescription: 'Use this Runescape Gift Card in your game to unlock a wide range of Membership, RuneCoin, and Key packages.',
    image: '/cards/run.png',
    rating: 4,
    originalPrice: 25,
    salePrice: 24,
    category: 'gaming',
    amounts: [10, 25]
  },
 
  {
    id: '58',
    title: 'Candy Crush Gift Card',
    description: 'Get Gold bars for game enhancements',
    fullDescription: 'Using Gold bars in Candy Crush is the best way to enhance your gaming experience. Use a Candy Crush gift card to unlock Lollipop Hammer and get more Moves and Lifes in the game.',
    image: '/cards/candycrush.png',
    rating: 3,
    originalPrice: 100,
    salePrice: 95,
    category: 'gaming',
    amounts: [25, 50, 100]
  },
  {
    id: '59',
    title: 'Foot Locker Gift Card',
    description: 'Shop for your favorite shoes online',
    fullDescription: 'Shop Foot Locker Gift Card and access to their website and get your favorite shoes online! Valid only for United States Foot Lockers Stores.',
    image: '/cards/foot1.png',
    rating: 4,
    originalPrice: 200,
    salePrice: 195,
    category: 'fashion',
    amounts: [50, 75, 100, 150, 200]
  },
  {
    id: '60',
    title: 'Bass Pro Shop Gift Card',
    description: 'Shop outdoor gear and fishing equipment',
    fullDescription: 'Bass Pro Shop gift card allows you to get your favorite Bass Pro products on their website. Perfect for outdoor enthusiasts and anglers.',
    image: '/cards/bass.png',
    rating: 4,
    originalPrice: 200,
    salePrice: 195,
    category: 'outdoors',
    amounts: [50, 75, 100, 150, 200]
  },
  {
    id: '61',
    title: 'Regal Gift Card',
    description: 'Watch movies at Regal cinemas',
    fullDescription: 'Watching movies online is not a problem anymore using Regal Gift Cards. Perfect for movie lovers and cinema-goers.',
    image: '/cards/regal.png',
    rating: 3,
    originalPrice: 100,
    salePrice: 95,
    category: 'entertainment',
    amounts: [25, 50, 100]
  },
  {
    id: '62',
    title: 'Blizzard Gift Card',
    description: 'Access your favorite Blizzard games',
    fullDescription: 'This US Blizzard Gift Card gives you access to your favorite Blizzard games. Shop it and start playing immediately.',
    image: '/cards/bliz.png',
    rating: 5,
    originalPrice: 50,
    salePrice: 48,
    category: 'gaming',
    amounts: [20, 50]
  },
  {
    id: '63',
    title: 'GameStop Gift Card',
    description: 'Shop the largest gaming store worldwide',
    fullDescription: 'Shop GameStop Gift Card to improve your gaming experience! Get anything you want from the largest gaming store worldwide right away!',
    image: '/cards/gamestop.png',
    rating: 5,
    originalPrice: 200,
    salePrice: 195,
    category: 'gaming',
    popular: true,
    amounts: [50, 75, 100, 150, 200]
  },
  {
    id: '64',
    title: 'Openbucks Gift Card',
    description: 'Trade on Openbucks website',
    fullDescription: 'Getting your favorite trades is not a problem with MyGiftCardSupplys Openbucks Gift Cards! Use the balance and trade on Openbucks website!',
    image: '/cards/open.png',
    rating: 3,
    originalPrice: 100,
    salePrice: 95,
    category: 'finance',
    amounts: [25, 50, 100]
  },
  // Previously added cards that were repeated in your request:
  
  
  {
    id: '67',
    title: 'Tidal Gift Card',
    description: 'Purchase Tidal Premium subscriptions',
    fullDescription: 'Use this Tidal Gift Card to purchase Tidal Premium subscriptions to enjoy ad-free music, offline playing, and create and share your favorite music with friends.',
    image: '/cards/tidal.png',
    rating: 3,
    originalPrice: 120,
    salePrice: 115,
    category: 'music',
    amounts: [20, 60, 120]
  },
  
  {
    id: '69',
    title: 'H&M Gift Card',
    description: 'Shop fashionable clothing at US H&M stores',
    fullDescription: 'Shop the US H&M Gift Card and access to their website to get your favorite fashion clothes right away! Valid only for US H&M stores.',
    image: '/cards/hm.png',
    rating: 4,
    originalPrice: 200,
    salePrice: 195,
    category: 'fashion',
    amounts: [50, 75, 100, 150, 200]
  },
  {
    id: '70',
    title: 'Aeropostale Gift Card',
    description: 'Shop trendy tops, hoodies and jeans',
    fullDescription: 'Shop Aeropostale for Guys and Girls Clothing. Browse the latest styles of tops, t shirts, hoodies, jeans, sweaters and more Aeropostale.',
    image: '/cards/aero.png',
    rating: 4,
    originalPrice: 200,
    salePrice: 195,
    category: 'fashion',
    amounts: [50, 75, 100, 150, 200]
  },
  {
    id: '71',
    title: 'MLB Shop Gift Card',
    description: 'Support your favorite baseball team',
    fullDescription: 'MLB Shop gift card allows you to get your favorite Major League Baseball products on their website to support your favorite team from the MLB.',
    image: '/cards/mlb.png',
    rating: 4,
    originalPrice: 200,
    salePrice: 195,
    category: 'sports',
    amounts: [50, 75, 100, 150, 200]
  },
  {
    id: '72',
    title: 'Cabelas Gift Card',
    description: 'Shop outdoor and hunting gear',
    fullDescription: 'This Cabelas gift card allows you to get your favorite Cabelas products on their website. Perfect for hunters and outdoor enthusiasts.',
    image: '/cards/cab.png',
    rating: 4,
    originalPrice: 200,
    salePrice: 195,
    category: 'outdoors',
    amounts: [50, 100, 150, 200]
  },
  {
    id: '73',
    title: 'CanvasPop Gift Card',
    description: 'Print your photos on canvas',
    fullDescription: 'Print any photo on canvas with CanvasPop. Pay for the service using our CanvasPop Gift Cards!',
    image: '/cards/canva.png',
    rating: 3,
    originalPrice: 50,
    salePrice: 48,
    category: 'arts',
    amounts: [50]
  },
 
  {
    id: '75',
    title: 'Hooters Gift Card',
    description: 'Enjoy wings and food at US locations',
    fullDescription: 'Shop Hooters Gift Card and access to their website to get your favorite wings, food and more! Valid only for Hooters Gift United States Local Stores.',
    image: '/cards/hoot.png',
    rating: 3,
    originalPrice: 150,
    salePrice: 145,
    category: 'food',
    amounts: [50, 100, 150]
  },
  {
    id: '76',
    title: 'Cinemark Gift Card',
    description: 'Get movie theater tickets',
    fullDescription: 'Shop Cinemark Gift Card to get your favorite movie theater tickets right away with MyGiftCardSupply!',
    image: '/cards/cin.png',
    rating: 3,
    originalPrice: 200,
    salePrice: 195,
    category: 'entertainment',
    amounts: [50, 100, 150, 200]
  },
  {
    id: '77',
    title: 'Abercrombie & Fitch Gift Card',
    description: 'Shop premium casual wear worldwide',
    fullDescription: 'Abercrombie & Fitch cards can be redeemed online at abercrombie.com, and can be used to get your favorite items from their store right away! Instant Worldwide Email Delivery.',
    image: '/cards/ab.png',
    rating: 4,
    originalPrice: 200,
    salePrice: 195,
    category: 'fashion',
    amounts: [50, 75, 100, 150, 200]
  },
  // Previously added cards that were repeated in your request:
  {
    id: '78',
    title: 'Foot Locker Gift Card',
    description: 'Shop for your favorite shoes online',
    fullDescription: 'Shop Foot Locker Gift Card and access to their website and get your favorite shoes online! Valid only for United States Foot Lockers Stores.',
    image: '/cards/foot1.png',
    rating: 4,
    originalPrice: 200,
    salePrice: 195,
    category: 'fashion',
    amounts: [50, 75, 100, 150, 200]
  },
  {
    id: '79',
    title: 'GameStop Gift Card',
    description: 'Shop the largest gaming store worldwide',
    fullDescription: 'Shop GameStop Gift Card to improve your gaming experience! Get anything you want from the largest gaming store worldwide right away!',
    image: '/cards/gamestop.png',
    rating: 5,
    originalPrice: 200,
    salePrice: 195,
    category: 'gaming',
    popular: true,
    amounts: [50, 75, 100, 150, 200]
  },
  {
    id: '80',
    title: 'Regal Gift Card',
    description: 'Watch movies at Regal cinemas',
    fullDescription: 'Watching movies online is not a problem anymore using Regal Gift Cards. Perfect for movie lovers and cinema-goers.',
    image: '/cards/regal.png',
    rating: 3,
    originalPrice: 100,
    salePrice: 95,
    category: 'entertainment',
    amounts: [25, 50, 100]
  },
  {
    id: '81',
    title: 'Blizzard Gift Card',
    description: 'Access your favorite Blizzard games',
    fullDescription: 'This US Blizzard Gift Card gives you access to your favorite Blizzard games. Shop it and start playing immediately.',
    image: '/cards/bliz.png',
    rating: 5,
    originalPrice: 50,
    salePrice: 48,
    category: 'gaming',
    amounts: [20, 50]
  },
  {
    id: "82",
    title: "UK IKEA Gift Card",
    description: "Shop online or in store at IKEA UK",
    fullDescription: "Pick up a UK IKEA Gift Card and shop online or in store to get the best deals! Valid only for IKEA's UK Stores.",
    image: "/cards/ik.png",
    rating: 5,
    originalPrice: 100,
    salePrice: 50,
    category: 'shopping',
    amounts: [50, 100, 200]
  },
  
  {
    id: "83",
    title: "US Karma Koin Gift Card",
    description: "Now called Nexon Game Card",
    fullDescription: "A US Karma Koin Gift Card, now called a Nexon Game Card, is the most convenient way to purchase merchandise online. Protect your identity and payment information, while also giving back to the community with each purchase. You can use your card balance on any store that accepts Karma Koin and Nexon Game Cards.",
    image: "/cards/karma.png",
    rating: 4,
    originalPrice: 20,
    salePrice: 10,
    category: "gaming",
    amounts: [10, 25, 50, 100]
  },
    {
      id: "84",
      title: "UK Tesco Gift Card",
      description: "Supermarket shopping made easy",
      fullDescription: "A UK Tesco Gift Card can be used for groceries, clothing, and household items at any Tesco store across the UK. Perfect for personal use or as a thoughtful gift.",
      image: "/cards/tesco.png",
      rating: 4,
      originalPrice: 25,
      salePrice: 24,
      category: "food",
      amounts: [5, 10, 20, 25, 30, 50]
    },
    {
      id: "85",
      title: "Costa UK Gift Card",
      description: "Your favorite coffee break",
      fullDescription: "Costa Coffee Gift Card is ideal for buying coffee, pastries, and snacks at any Costa Coffee location in the UK. Delivered as a digital or physical gift card.",
      image: "/cards/costa.png",
      rating: 4,
      originalPrice: 25,
      salePrice: 23,
      category: "food",
      amounts: [5, 10, 20, 25, 30, 50, 100]
    },
    {
      id: "86",
      title: "McDonald's USA Gift Card",
      description: "Enjoy meals at McDonald's",
      fullDescription: "The McDonald's Arch Card is the best way to enjoy fast food favorites across the USA. No fees and no expiration date make it a great gift for anyone.",
      image: "/cards/mc.png",
      rating: 5,
      originalPrice: 25,
      salePrice: 24,
      category: "food",
      amounts: [10, 25, 50, 100]
    },
    {
      id: "87",
      title: "Chipotle USA Gift Card",
      description: "Flavor-packed Mexican meals",
      fullDescription: "Chipotle Gift Cards are valid across the USA for burritos, bowls, tacos, and more. Digital or physical format available. Easy to redeem online or in-store.",
      image: "/cards/chip.png",
      rating: 4,
      originalPrice: 25,
      salePrice: 23,
      category: "food",
      amounts: [5, 10, 25, 50, 100]
    },
    {
      id: "88",
      title: "Starbucks USA Gift Card",
      description: "Perfect for coffee lovers",
      fullDescription: "Use this Starbucks USA Gift Card for drinks, food, or merchandise at any participating Starbucks store in the United States. Redeemable online and in-store.",
      image: "/cards/chipp.png",
      rating: 5,
      originalPrice: 25,
      salePrice: 24,
      category: "food",
      amounts: [5, 10, 25, 50, 100, 500]
    },
    {
      id: "89",
      title: "Starbucks UK Gift Card",
      description: "Coffee treats across the UK",
      fullDescription: "Enjoy handcrafted beverages and snacks with a Starbucks UK Gift Card. Works at any UK Starbucks location. Can be used via mobile or physical card.",
      image: "/cards/chipp.png",
      rating: 4,
      originalPrice: 25,
      salePrice: 24,
      category: "food",
      amounts: [10, 25, 50, 100, 150]
    },
    {
      id: "90",
      title: "Pizza Hut USA Gift Card",
      description: "Pizza cravings sorted",
      fullDescription: "Pizza Hut USA Gift Card is great for ordering delicious pizzas, wings, and sides online or in-store anywhere in the US. No expiry or fees.",
      image: "/cards/pizza.png",
      rating: 4,
      originalPrice: 25,
      salePrice: 23,
      category: "food",
      amounts: [10, 25, 50, 100]
    },
    {
      id: "91",
      title: "Domino's USA Gift Card",
      description: "Hot pizza delivered fast",
      fullDescription: "Domino’s USA Gift Card is redeemable for online and in-store purchases at Domino’s locations throughout the US. No expiration or service fees apply.",
      image: "/cards/dom.png",
      rating: 5,
      originalPrice: 25,
      salePrice: 24,
      category: "food",
      amounts: [10, 25, 50, 100]
    }
  
  
  
];

