import _ from "lodash";
import { BiSupport } from "react-icons/bi";
import { FiTruck } from "react-icons/fi";
import { TiClipboard } from "react-icons/ti";
import heroImage from "@/images/hero.png";
import shoeImage from "@/images/category_shoe.png";
import bagImage from "@/images/category_bag.png";
import menImage from "@/images/men2.png";
// import accessoriesImage from "@/images/category_accessories.png";
import readyMadeClothImage from "@/images/readyMade.webp";
import readyMadeShoeImage from "@/images/readyMadeShoe.webp";
import bespokeShoeImage from "@/images/customShoe.jpg";
import bespokeClothImage from "@/images/bespokeCloth.webp";
import accesoriesImage from "@/images/accesories.webp";

type NavItemType = {
  id: string;
  href: string;
  name: string;
  type?: string;
  children?: NavItemType[];
};

const ncNanoId = _.uniqueId;

const otherPageChildMenus: NavItemType[] = [
  {
    id: ncNanoId(),
    href: "/home",
    name: "Home",
  },
  {
    id: ncNanoId(),
    href: "/checkout",
    name: "Checkout",
  },
  {
    id: ncNanoId(),
    href: "/contact",
    name: "Contact Us",
  },
  {
    id: ncNanoId(),
    href: "/cart",
    name: "Cart",
  },
  {
    id: ncNanoId(),
    href: "/products",
    name: "Collections",
    type: "dropdown",
    children: [
      {
        id: ncNanoId(),
        href: "/products",
        name: "Collections",
      },
      {
        id: ncNanoId(),
        href: "/products/sweat-outfit",
        name: "Product Single",
      },
    ],
  },
  {
    id: ncNanoId(),
    href: "/",
    name: "Utility Pages",
    type: "dropdown",
    children: [
      {
        id: ncNanoId(),
        href: "/faqs",
        name: "FAQS",
      },
      {
        id: ncNanoId(),
        href: "/gg",
        name: "404 not found",
      },
      {
        id: ncNanoId(),
        href: "/signup",
        name: "Signup",
      },
      {
        id: ncNanoId(),
        href: "/login",
        name: "Login",
      },
      {
        id: ncNanoId(),
        href: "/forgot-pass",
        name: "Forgot Password",
      },
    ],
  },
  {
    id: ncNanoId(),
    href: "/blog",
    name: "Blog Pages",
    type: "dropdown",
    children: [
      {
        id: ncNanoId(),
        href: "/blog",
        name: "Blog Page",
      },
      {
        id: ncNanoId(),
        href: "/blog/chic-sleek-latest-trends-fashion-wonderland",
        name: "Blog Single",
      },
    ],
  },
];

export const NavLinks: NavItemType[] = [
  {
    id: ncNanoId(),
    name: "Home",
    href: "/",
  },

  {
    id: ncNanoId(),
    name: "Pages",
    href: "/",
    type: "dropdown",
    children: otherPageChildMenus,
  },

  {
    id: ncNanoId(),
    name: "Contact",
    href: "/contact",
  },
];
export const menuLinks = [
  {
    link: "Ready Made Cloth",
    image: readyMadeClothImage,
  },
  {
    link: "Bespoke Cloth",
    image: bespokeClothImage,
  },
  {
    link: "Ready Made Shoe",
    image: readyMadeShoeImage,
  },

  {
    link: "Bespoke Shoe",
    image: bespokeShoeImage,
  },

  {
    link: "Accessory",
    image: accesoriesImage,
  },
];
export const bespokeTimeLine = [
  {
    title: "Submit Body Measurements / Place Order",
    description: "Submit your body measurements while placing order",
    buttonLabel: "View Body Measurement Guide",
    buttonLink: "/body-measurement-guide",
  },
  {
    title: "Order Confirmation",
    description: "We confirm your order and sort any clarifications",
  },
  {
    title: "Cutting",
    description: "Our tailors cut the fabric to your body measurements",
  },
  {
    title: "Sewing",
    description: "Our tailors sew the fabric to your body measurements",
  },
  {
    title: "Quality Check / Ready for Dispatch",
    description: "We check the quality of the cloth before dispatching",
  },
  {
    title: "Dispatch",
    description: "We dispatch the cloth to your location",
  },
  {
    title: "Delivery",
    description: "You receive your bespoke cloth",
  },
  {
    title: "Feedback / Return",
    description: "We get feedback from you and accept returns if necessary",
  },
];
export const readyMadeTimeLine = [
  {
    title: "Place Order",
    description: "Place your order online or contact us for assistance",
    buttonLabel: "View Size Guide",
    buttonLink: "/body-measurement-guide",
  },
  {
    title: "Order Confirmation",
    description: "We confirm your order and sort any clarifications",
  },
  {
    title: "Order Processing",
    description: "We process your order and prepare for dispatch",
  },

  {
    title: "Quality Check / Ready for Dispatch",
    description: "We check the quality of the cloth before dispatching",
  },
  {
    title: "Dispatch",
    description: "We dispatch the cloth to your location",
  },
  {
    title: "Delivery",
    description: "You receive your bespoke cloth",
  },
  {
    title: "Feedback / Return",
    description: "We get feedback from you and accept returns if necessary",
  },
];

export const slideCategories = [
  {
    coverImage: heroImage,
    title: "Female Clothings",
    year: 2023,
    link: "products?gender=Female",
  },
  {
    coverImage: menImage,
    title: "Men Clothings",
    year: null,
    link: "products?gender=Male",
  },
  {
    coverImage: shoeImage,
    title: "Shoes",
    year: null,
    link: "products?main=Footwear",
  },
  {
    coverImage: bagImage,
    title: "Accessories",
    year: null,
    link: "products?main=Accessories",
  },
  // {
  //   coverImage: bagImage,
  //   title: "Bags",
  //   year: null,
  //   link: "products?accessoryType=Bag",
  // },
];

export const midText =
  "Browse through our carefully carted collection of high-quality clothing & accessories featuring the latest trends and style";

export const allStars = [1, 2, 3, 4, 5];

export const products = [
  {
    slug: "brown-coat",
    coverImage:
      "https://images.unsplash.com/photo-1619603364937-8d7af41ef206?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    productName: "Brown Coat",
    price: 159,
    reviews: 45,
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vitae, est eum magnam doloremque, at adipisci debitis, similique dolores ipsa unde necessitatibus vero quibusdam nostrum numquam!",
    shots: [
      "https://images.unsplash.com/photo-1619603364937-8d7af41ef206?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDF8fHxlbnwwfHx8fHw%3D",
      "https://images.unsplash.com/photo-1512101903502-7eb0c9022c74?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDJ8fHxlbnwwfHx8fHw%3D",
      "https://images.unsplash.com/photo-1496217590455-aa63a8350eea?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
  },
  {
    slug: "sweat-outfit",
    coverImage:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZmFzaGlvbiUyMG1vZGVsfGVufDB8fDB8fHww",
    productName: "Sweat Outfit",
    price: 129,
    reviews: 45,
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vitae, est eum magnam doloremque, at adipisci debitis, similique dolores ipsa unde necessitatibus vero quibusdam nostrum numquam!",
    shots: [
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZmFzaGlvbiUyMG1vZGVsfGVufDB8fDB8fHww",
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDF8fHxlbnwwfHx8fHw%3D",
      "https://images.unsplash.com/photo-1512101903502-7eb0c9022c74?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDJ8fHxlbnwwfHx8fHw%3D",
      "https://images.unsplash.com/photo-1496217590455-aa63a8350eea?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
  },
  {
    slug: "sweat-shirt",
    coverImage:
      "https://images.unsplash.com/photo-1578681994506-b8f463449011?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    productName: "Sweat Shirt",
    price: 299,
    reviews: 45,
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vitae, est eum magnam doloremque, at adipisci debitis, similique dolores ipsa unde necessitatibus vero quibusdam nostrum numquam!",
    shots: [
      "https://images.unsplash.com/photo-1578681994506-b8f463449011?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDF8fHxlbnwwfHx8fHw%3D",
      "https://images.unsplash.com/photo-1512101903502-7eb0c9022c74?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDJ8fHxlbnwwfHx8fHw%3D",
      "https://images.unsplash.com/photo-1496217590455-aa63a8350eea?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
  },
  {
    slug: "black-t-shirt",
    coverImage:
      "https://images.unsplash.com/photo-1503342250614-ca440786f637?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    productName: "Black T-shirt",
    price: 169,
    reviews: 45,
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vitae, est eum magnam doloremque, at adipisci debitis, similique dolores ipsa unde necessitatibus vero quibusdam nostrum numquam!",
    shots: [
      "https://images.unsplash.com/photo-1503342250614-ca440786f637?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDF8fHxlbnwwfHx8fHw%3D",
      "https://images.unsplash.com/photo-1512101903502-7eb0c9022c74?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDJ8fHxlbnwwfHx8fHw%3D",
      "https://images.unsplash.com/photo-1496217590455-aa63a8350eea?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
  },
  {
    slug: "black-hoodie",
    coverImage:
      "https://images.unsplash.com/photo-1633292587737-f898a032e562?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDJ8fHxlbnwwfHx8fHw%3D",
    productName: "Black Hoodie",
    price: 139,
    reviews: 45,
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vitae, est eum magnam doloremque, at adipisci debitis, similique dolores ipsa unde necessitatibus vero quibusdam nostrum numquam!",
    shots: [
      "https://images.unsplash.com/photo-1633292587737-f898a032e562?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDJ8fHxlbnwwfHx8fHw%3D",
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDF8fHxlbnwwfHx8fHw%3D",
      "https://images.unsplash.com/photo-1512101903502-7eb0c9022c74?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDJ8fHxlbnwwfHx8fHw%3D",
      "https://images.unsplash.com/photo-1496217590455-aa63a8350eea?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
  },
  {
    slug: "yellow-glases",
    coverImage:
      "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8ZmFzaGlvbiUyMG1vZGVsfGVufDB8fDB8fHww",
    productName: "Yellow Glasses",
    price: 159,
    reviews: 45,
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vitae, est eum magnam doloremque, at adipisci debitis, similique dolores ipsa unde necessitatibus vero quibusdam nostrum numquam!",
    shots: [
      "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8ZmFzaGlvbiUyMG1vZGVsfGVufDB8fDB8fHww",
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDF8fHxlbnwwfHx8fHw%3D",
      "https://images.unsplash.com/photo-1512101903502-7eb0c9022c74?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDJ8fHxlbnwwfHx8fHw%3D",
      "https://images.unsplash.com/photo-1496217590455-aa63a8350eea?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
  },
];

export const profilesPhotos = [
  "https://images.unsplash.com/photo-1534308143481-c55f00be8bd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1930&q=80",
  "https://images.unsplash.com/photo-1584999734482-0361aecad844?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2080&q=80",
  "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDV8fHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=500&q=60",
];

export const signUpSection = {
  heading: "...Bespokely Crafted, Tailored to your style...",
  promoTitle: "Sign up and earn 500 points",

  review: {
    quote: `"Over the years, I've learned that you can have fun with the fabrics and other elements, but if it's not tailored right, you'll blow it."`,
    reviewer: "James Marsden",
  },
};
export const ourDifference = [
  {
    header: "Global Reach",
    description: "With Zeap, you can sell to customers around the world.",
  },
  {
    header: "Simple and Efficient",
    description:
      "Our platform is easy to use, allowing you to manage your sales and inventory with ease.",
  },
  {
    header: "Dedicated Support",
    description:
      "Our team is here to help you every step of the way. Whether you have questions about selling on Zeap or need assistance with your account, we're here for you.",
  },

  {
    header: "Join a Community of Sellers",
    description:
      "Be part of a community of sellers who are dedicated to success. You'll have access to resources and support to help you grow your business.",
  },
];
export const sellingSimplified = [
  {
    header: "Easy Setup",
    description:
      "Setting up your store on Zeap is quick and easy. You can start selling in no time.",
  },
  {
    header: "Business Activation",
    description:
      "Our admin team will review your application and activate your business.",
  },
  {
    header: "List",
    description:
      "List your products and start selling. Our platform is designed to make it easy for you to showcase your products and reach customers.",
  },

  {
    header: "Sell",
    description:
      "Share with millions of customers. Our platform is designed to help you reach a wide audience and increase your sales.",
  },
  {
    header: "Get Paid",
    description:
      "Once your products are sold, you can get paid quickly and easily.",
  },
];

export const footerData = {
  footerLinks: [
    {
      title: "Company",
      links: [
        { href: "/about", name: "About" },
        { href: "/sell-on-zeap", name: "Sell on Zeap" },
        { href: "/", name: "Offices" },
        { href: "/blog", name: "Blogs" },
      ],
    },
    {
      title: "Get Help",
      links: [
        { href: "/contact", name: "Contact Us" },

        { href: "/faq", name: "FAQS" },
        { href: "/", name: "Returns" },
        { href: "/help", name: "Center" },
      ],
    },
  ],
};

export const sizes = ["XS", "S", "M", "L", "XL"];

export const note =
  " Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vitae, est eum magnam doloremque, at adipisci debitis, similique dolores ipsa unde necessitatibus vero quibusdam nostrum numquam!";

export const contactSection = {
  title: "contact us",
  heading: "How may we help you",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quis quis phasellus eleifend tellus orci ornare.",
  directContactInfo: [
    {
      icon: <BiSupport className="text-3xl" />,
      title: "Order",
      contactLink: {
        href: "mailto:order@luxloom.com",
        title: "order@luxloom.com",
      },
    },
    {
      icon: <FiTruck className="text-3xl" />,
      title: "Start a Return",
      contactLink: {
        href: "mailto:return@luxloom.com",
        title: "return@luxloom.com",
      },
    },
    {
      icon: <TiClipboard className="text-3xl" />,
      title: "Sizing and Product Info",
      contactLink: {
        href: "mailto:products@luxloom.com",
        title: "products@luxloom.com",
      },
    },
  ],
};

export const faqsData = {
  heading: "Frequently Asked Questions",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin eget adipiscing nibh nunc. Velit rhoncus arcu velesaed.",
  faqs: [
    {
      category: "Shipping & Delivery",
      data: [
        {
          question: "How can I track my order?",
          answer:
            "You can track your order by logging into your account and checking the order status. Additionally, a tracking number will be provided in the shipping confirmation email.",
        },
        {
          question: "What is the estimated delivery time for my order?",
          answer:
            "Delivery times vary based on your location. Typically, domestic orders take 3-5 business days, while international orders may take 7-14 business days.",
        },
        {
          question: "Can I change my shipping address after placing an order?",
          answer:
            "Unfortunately, we cannot change the shipping address once the order is placed. Please double-check your information before completing the purchase.",
        },
        {
          question: "Do you offer expedited shipping options?",
          answer:
            "Yes, we offer expedited shipping at an additional cost. You can choose your preferred shipping method during the checkout process.",
        },
        {
          question: "What should I do if my order is delayed or lost?",
          answer:
            "If your order is significantly delayed or lost, please contact our customer support team, and we will investigate the issue.",
        },
      ],
    },
    {
      category: "Warranty & Repair",
      data: [
        {
          question: "How do I determine the right size for my sneakers?",
          answer:
            "Refer to our size chart available on the product page. It provides measurements and guidelines to help you choose the correct size.",
        },
        {
          question: "Are your sneakers authentic?",
          answer:
            "Yes, we guarantee the authenticity of all our sneakers. We source them directly from authorized retailers and reputable suppliers.",
        },
        {
          question: "Can I return or exchange my sneakers if they don't fit?",
          answer:
            "Yes, we have a hassle-free return policy. You can return or exchange unworn sneakers within 30 days of receiving your order.",
        },
        {
          question: "Are the colors of the sneakers accurate in the photos?",
          answer:
            "We strive to provide accurate color representation, but slight variations may occur due to monitor settings. Refer to product descriptions for additional details.",
        },
        {
          question: "Do you restock sold-out sneakers?",
          answer:
            "We restock popular styles based on demand. You can sign up for notifications to be informed when a specific product is back in stock.",
        },
      ],
    },
    {
      category: "Payments & Safety",
      data: [
        {
          question: "What payment methods do you accept?",
          answer:
            "We accept major credit cards, PayPal, and other secure payment methods. You can view the full list during the checkout process.",
        },
        {
          question: "How can I apply a discount code to my order?",
          answer:
            "Enter your discount code in the designated field during checkout. The discount will be applied to your total before payment.",
        },
        {
          question: "Can I modify or cancel my order after payment?",
          answer:
            "Once an order is placed, it cannot be modified or canceled. Please review your order carefully before completing the purchase.",
        },
        {
          question: "Is my payment information secure?",
          answer:
            "Yes, we use industry-standard encryption to secure your payment information. Your data is protected and never stored on our servers.",
        },
        {
          question: "Do you offer gift cards?",
          answer:
            "Yes, we offer gift cards of various denominations. They make great presents for sneaker enthusiasts!",
        },
      ],
    },
    {
      category: "Returns & Refunds",
      data: [
        {
          question: "How do I initiate a return or exchange?",
          answer:
            'Visit the "Returns & Exchanges" page on our website, follow the instructions, and submit a request. Our team will guide you through the process.',
        },
        {
          question: "What is your return policy for defective products?",
          answer:
            "If you receive a defective product, please contact our customer support within 7 days of receiving the order. We will arrange a replacement or refund.",
        },
        {
          question: "Are there any restocking fees for returns?",
          answer:
            "We do not charge restocking fees for returns. However, please review our return policy for specific details.",
        },
        {
          question: "How long does it take to process a refund?",
          answer:
            "Refunds are typically processed within 5-7 business days after we receive the returned items and verify their condition.",
        },
        {
          question: "Can I return sneakers if I've worn them?",
          answer:
            "We only accept returns for unworn sneakers. Please try them on in a clean, indoor environment to ensure they are the right fit before wearing them outside.",
        },
      ],
    },
  ],
};

export const productsCollection = {
  heading: "Collections",
  description:
    "Lorem ipsum dolor sit amet consectetur adipiscing elit facilisi pellentesque cursus eget morbi sagittis sagittis.",
};
