import React, { useState, useEffect } from "react";
import {
  Search,
  ShoppingBag,
  Phone,
  Mail,
  MapPin,
  Star,
  Menu,
  X,
  Sun,
  Moon,
  Sparkles,
  Award,
  Users,
  TrendingUp,
  Heart,
  ArrowRight,
  ShoppingCart,
  Plus,
  Minus,
  Trash2,
  CreditCard,
  Lock,
  Wallet,
  Clock,
} from "lucide-react";

// Sample product data
const products = [
  {
    id: 1,
    name: "Gold Necklace Set",
    price: 45000,
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=400&fit=crop",
  },
  {
    id: 2,
    name: "Diamond Ring",
    price: 85000,
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=400&fit=crop",
  },
  {
    id: 3,
    name: "Gold Bangles",
    price: 35000,
    rating: 4,
    image:
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&h=400&fit=crop",
  },
  {
    id: 4,
    name: "Pearl Earrings",
    price: 25000,
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&h=400&fit=crop",
  },
  {
    id: 5,
    name: "Gold Chain",
    price: 55000,
    rating: 4,
    image:
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=400&fit=crop",
  },
  {
    id: 6,
    name: "Bridal Set",
    price: 125000,
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=400&h=400&fit=crop",
  },
];

const testimonials = [
  {
    name: "Priya Sharma",
    text: "Absolutely love my bridal jewelry from Dwarika! The craftsmanship is exquisite.",
    rating: 5,
  },
  {
    name: "Rajesh Patel",
    text: "Best gold shop in town. Authentic products and great customer service.",
    rating: 5,
  },
  {
    name: "Anita Rai",
    text: "Bought a beautiful necklace set for my daughter's wedding. Highly recommend!",
    rating: 5,
  },
];

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [currentPage, setCurrentPage] = useState("home");
  const [searchQuery, setSearchQuery] = useState(""); // Committed search term
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cart, setCart] = useState([]); // Cart items: [{product, quantity}, ...]
  const [selectedProduct, setSelectedProduct] = useState(null); // For product detail view
  const [showProductDetail, setShowProductDetail] = useState(false); // Toggle product detail modal


  const topRatedProducts = products.filter((p) => p.rating === 5).slice(0, 3);

  const getFilteredProducts = () => {
    return products.filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  // Cart Management Functions
  const addToCart = (product, quantity = 1) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.product.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevCart, { product, quantity }];
    });
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.product.id !== productId));
  };

  const updateCartQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
  };

  const getCartItemCount = () => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  };

  const Navbar = () => {
    // Local search state INSIDE Navbar - this fixes everything!
    const [localTempQuery, setLocalTempQuery] = useState("");

    const localCommitSearch = () => {
      setSearchQuery(localTempQuery);
      if (localTempQuery.trim() !== "") {
        setCurrentPage("search");
      } else {
        setCurrentPage("home");
      }
    };

    return (
      <nav
        className={`sticky top-0 z-50 ${
          darkMode ? "bg-gray-900" : "bg-gradient-to-b from-stone-100 via-stone-50 to-stone-100"
        } shadow-lg`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <img
                src="/logo.png"
                alt="Dwarika Logo"
                className="w-20 h-20 object-contain"
              />
              <span
                className={`text-3xl font-bold bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-700 bg-clip-text text-transparent`}
              >
                Dwarika
              </span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <button
                onClick={() => setCurrentPage("home")}
                className={`${
                  currentPage === "home"
                    ? "text-amber-600"
                    : darkMode
                    ? "text-gray-300"
                    : "text-gray-700"
                } hover:text-amber-600 font-medium`}
              >
                Home
              </button>
              <button
                onClick={() => setCurrentPage("products")}
                className={`${
                  currentPage === "products"
                    ? "text-amber-600"
                    : darkMode
                    ? "text-gray-300"
                    : "text-gray-700"
                } hover:text-amber-600 font-medium`}
              >
                Products
              </button>
              <button
                onClick={() => setCurrentPage("about")}
                className={`${
                  currentPage === "about"
                    ? "text-amber-600"
                    : darkMode
                    ? "text-gray-300"
                    : "text-gray-700"
                } hover:text-amber-600 font-medium`}
              >
                About
              </button>
              <button
                onClick={() => setCurrentPage("contact")}
                className={`${
                  currentPage === "contact"
                    ? "text-amber-600"
                    : darkMode
                    ? "text-gray-300"
                    : "text-gray-700"
                } hover:text-amber-600 font-medium`}
              >
                Contact
              </button>
            </div>

            <div className="flex items-center space-x-4">
              {/* Search Bar - NOW FULLY WORKING */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={localTempQuery}
                  onChange={(e) => setLocalTempQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      localCommitSearch();
                    }
                  }}
                  className={`pl-10 pr-12 py-2 rounded-full w-48 lg:w-64 focus:outline-none focus:ring-2 focus:ring-amber-600 transition-all duration-200 ${
                    darkMode
                      ? "bg-gray-800 text-white placeholder-gray-400"
                      : "bg-stone-100 text-gray-900 placeholder-stone-500"
                  }`}
                />
                <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400 pointer-events-none" />
                <button
                  onClick={localCommitSearch}
                  className={`absolute right-3 top-2.5 rounded-full transition-all duration-200 ${
                    localTempQuery.trim()
                      ? "bg-amber-600 text-white hover:bg-amber-700 shadow-md hover:shadow-lg"
                      : darkMode
                      ? "bg-gray-700 text-gray-400 hover:bg-gray-600"
                      : "bg-stone-300 text-stone-600 hover:bg-stone-400"
                  }`}
                  aria-label="Search"
                >
                  <Search className="w-6 h-6" />
                </button>
              </div>

              {/* Cart Icon */}
              <button
                onClick={() => setCurrentPage("cart")}
                className="relative p-2 rounded-full hover:bg-amber-100 dark:hover:bg-gray-700 transition-colors"
              >
                <ShoppingCart className={`w-6 h-6 ${darkMode ? "text-white" : "text-gray-700"}`} />
                {cart.length > 0 && (
                  <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {cart.reduce((sum, item) => sum + item.quantity, 0)}
                  </span>
                )}
              </button>

              {/* Dark Mode Toggle */}
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`p-2 rounded-full ${
                  darkMode ? "bg-gray-800" : "bg-stone-200"
                } hover:bg-amber-100 dark:hover:bg-gray-700`}
              >
                {darkMode ? (
                  <Sun className="w-5 h-5 text-yellow-400" />
                ) : (
                  <Moon className="w-5 h-5 text-amber-600" />
                )}
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2"
              >
                {mobileMenuOpen ? (
                  <X className={darkMode ? "text-white" : "text-gray-900"} />
                ) : (
                  <Menu className={darkMode ? "text-white" : "text-gray-900"} />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden pb-4">
              <div className="flex flex-col space-y-3">
                <button
                  onClick={() => {
                    setCurrentPage("home");
                    setMobileMenuOpen(false);
                  }}
                  className={`text-left ${
                    currentPage === "home"
                      ? "text-amber-600"
                      : darkMode
                      ? "text-gray-300"
                      : "text-gray-700"
                  } hover:text-amber-600`}
                >
                  Home
                </button>
                <button
                  onClick={() => {
                    setCurrentPage("products");
                    setMobileMenuOpen(false);
                  }}
                  className={`text-left ${
                    currentPage === "products"
                      ? "text-amber-600"
                      : darkMode
                      ? "text-gray-300"
                      : "text-gray-700"
                  } hover:text-amber-600`}
                >
                  Products
                </button>
                <button
                  onClick={() => {
                    setCurrentPage("about");
                    setMobileMenuOpen(false);
                  }}
                  className={`text-left ${
                    currentPage === "about"
                      ? "text-amber-600"
                      : darkMode
                      ? "text-gray-300"
                      : "text-gray-700"
                  } hover:text-amber-600`}
                >
                  About
                </button>
                <button
                  onClick={() => {
                    setCurrentPage("contact");
                    setMobileMenuOpen(false);
                  }}
                  className={`text-left ${
                    currentPage === "contact"
                      ? "text-amber-600"
                      : darkMode
                      ? "text-gray-300"
                      : "text-gray-700"
                  } hover:text-amber-600`}
                >
                  Contact
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>
    );
  };

  const Hero = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const heroImages = [
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=1200&h=800&fit=crop",
    ];

    useEffect(() => {
      const timer = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
      }, 5000);
      return () => clearInterval(timer);
    }, []);

    return (
      <div
        className={`relative min-h-[90vh] flex items-center justify-center overflow-hidden ${
        darkMode
            ? "bg-gradient-to-br from-gray-900 via-indigo-900 to-gray-900"
            : "bg-gradient-to-br from-amber-50 via-stone-50 to-indigo-50"
        }`}
      >
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-400 rounded-full opacity-20 blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-700 rounded-full opacity-20 blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-amber-400 to-indigo-400 rounded-full opacity-10 blur-3xl"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-center lg:text-left space-y-8">
              <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4 ${
                darkMode ? "bg-amber-900/30 text-amber-400" : "bg-amber-100 text-amber-700"
              }`}>
                <Sparkles className="w-5 h-5" />
                <span className="text-sm font-semibold">Premium Collection</span>
              </div>
              
              <h1
                className={`text-5xl md:text-6xl lg:text-7xl font-bold leading-tight ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
                Timeless{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600">
                  Elegance
            </span>
                <br />
                in Every Piece
          </h1>
              
          <p
                className={`text-xl md:text-2xl leading-relaxed ${
              darkMode ? "text-gray-300" : "text-gray-600"
            }`}
          >
                Discover our exquisite collection of handcrafted gold jewelry,
                designed to make every moment special and memorable
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button 
                  onClick={() => {
                    setSearchQuery("");
                    setCurrentPage("search");
                  }}
                  className="group relative bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-700 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-2xl transform hover:scale-105 transition-all duration-300 overflow-hidden"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Explore Collection
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-700 to-yellow-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </button>
                <button
                  onClick={() => setCurrentPage("contact")}
                  className={`px-8 py-4 rounded-full text-lg font-semibold border-2 ${
                    darkMode
                      ? "border-amber-500 text-amber-400 hover:bg-amber-900/30"
                      : "border-amber-600 text-amber-600 hover:bg-amber-50"
                  } transition-all duration-300`}
                >
                  Contact Us
                </button>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-6 pt-8">
                <div>
                  <div className={`text-3xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>35+</div>
                  <div className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>Years Experience</div>
                </div>
                <div>
                  <div className={`text-3xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>10K+</div>
                  <div className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>Happy Customers</div>
                </div>
                <div>
                  <div className={`text-3xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>5★</div>
                  <div className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>Average Rating</div>
                </div>
              </div>
            </div>

            {/* Right Image Slider */}
            <div className="relative">
              <div className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl">
                {heroImages.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Hero ${index + 1}`}
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                      index === currentImageIndex ? "opacity-100" : "opacity-0"
                    }`}
                  />
                ))}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              </div>
              
              {/* Image Indicators */}
              <div className="flex justify-center gap-2 mt-6">
                {heroImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      index === currentImageIndex
                        ? "w-8 bg-amber-600"
                        : darkMode
                        ? "w-2 bg-gray-600"
                        : "w-2 bg-gray-300"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const Categories = () => {
    const categories = [
      {
        name: "Necklaces",
        icon: "💎",
        count: 45,
        image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=400&fit=crop",
      },
      {
        name: "Rings",
        icon: "💍",
        count: 32,
        image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=400&fit=crop",
      },
      {
        name: "Bangles",
        icon: "✨",
        count: 28,
        image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&h=400&fit=crop",
      },
      {
        name: "Earrings",
        icon: "🌟",
        count: 38,
        image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&h=400&fit=crop",
      },
      {
        name: "Bridal Sets",
        icon: "👑",
        count: 15,
        image: "https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=400&h=400&fit=crop",
      },
      {
        name: "Chains",
        icon: "🔗",
        count: 25,
        image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=400&fit=crop",
      },
    ];

    return (
      <div className={`py-20 ${darkMode ? "bg-gray-900" : "bg-gradient-to-b from-stone-100 to-stone-50"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2
              className={`text-4xl md:text-5xl font-bold mb-4 ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Shop by Category
            </h2>
            <p
              className={`text-xl ${
              darkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
              Explore our curated collections
          </p>
        </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {categories.map((category, index) => (
              <div
                key={index}
                className="group relative cursor-pointer"
                onClick={() => {
                  setSearchQuery(category.name);
                  setCurrentPage("search");
                }}
              >
                <div
                  className={`relative h-48 rounded-2xl overflow-hidden ${
                    darkMode ? "bg-gray-800" : "bg-stone-200"
                  } transform group-hover:scale-105 transition-all duration-300 shadow-lg group-hover:shadow-2xl`}
                >
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                    <div className="text-5xl mb-2 transform group-hover:scale-110 transition-transform">
                      {category.icon}
      </div>
                    <h3
                      className={`text-lg font-bold ${
                        darkMode ? "text-white" : "text-white"
                      } text-center`}
                    >
                      {category.name}
                    </h3>
                    <p className="text-sm text-gray-300 mt-1">
                      {category.count} items
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
    </div>
  );
  };

  const FeaturedCollection = () => {
    // Show only top-rated products (5 stars) - limit to 3 items
    const featuredProducts = products
      .filter((p) => p.rating === 5)
      .slice(0, 3);

    return (
      <div className={`py-20 ${darkMode ? "bg-gray-800" : "bg-gradient-to-b from-stone-100 via-stone-50 to-amber-50"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
          <h2
              className={`text-4xl md:text-5xl font-bold mb-4 ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
              Featured Collection
          </h2>
            <p
              className={`text-xl mb-6 ${
                darkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Handpicked excellence for you
            </p>
            <button
              onClick={() => setCurrentPage("products")}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-700 text-white font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              View All Products
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

          {/* Featured Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <div
                key={product.id}
                className={`group relative ${
                  darkMode ? "bg-gray-900" : "bg-gradient-to-br from-stone-50 via-amber-50/20 to-stone-100"
                } rounded-2xl overflow-hidden shadow-xl transform hover:scale-105 transition-all duration-300 border-2 ${
                  darkMode ? "border-gray-700" : "border-amber-200"
                } hover:shadow-2xl`}
              >
                <div className="relative h-72 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4">
                    <button className="p-2 rounded-full bg-stone-100/90 backdrop-blur-sm hover:bg-stone-200 transition-colors shadow-lg">
                      <Heart className="w-5 h-5 text-gray-600 hover:text-red-500" />
                    </button>
                  </div>
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full bg-yellow-400 text-yellow-900 text-xs font-bold flex items-center gap-1">
                      <Star className="w-3 h-3 fill-yellow-900" />
                      Featured
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3
                    className={`text-xl font-bold mb-2 ${
                      darkMode ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {product.name}
                  </h3>
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(product.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                    <span
                      className={`ml-2 text-sm ${
                        darkMode ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      ({product.rating}.0)
                    </span>
                  </div>
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">
                    ₹{product.price.toLocaleString()}
                  </p>
                    <button className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                      darkMode 
                        ? "bg-amber-900/30 text-amber-400 hover:bg-amber-900/50" 
                        : "bg-amber-100 text-amber-700 hover:bg-amber-200"
                    }`}>
                      <ShoppingBag className="w-5 h-5" />
                    </button>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedProduct(product);
                      setShowProductDetail(true);
                    }}
                    className="w-full bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-700 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 group/btn"
                  >
                    View Details
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const Statistics = () => {
    const stats = [
      {
        icon: <Award className="w-6 h-6" />,
        value: "35+",
        label: "Years of Excellence",
        color: "from-yellow-400 to-yellow-600",
      },
      {
        icon: <Users className="w-6 h-6" />,
        value: "10K+",
        label: "Happy Customers",
        color: "from-indigo-500 to-indigo-700",
      },
      {
        icon: <TrendingUp className="w-6 h-6" />,
        value: "5★",
        label: "Average Rating",
        color: "from-blue-400 to-blue-600",
      },
      {
        icon: <Sparkles className="w-6 h-6" />,
        value: "500+",
        label: "Unique Designs",
        color: "from-amber-400 to-amber-600",
      },
    ];

    return (
      <div
        className={`py-12 relative overflow-hidden ${
          darkMode
            ? "bg-gradient-to-br from-gray-900 via-indigo-900 to-gray-900"
            : "bg-gradient-to-br from-indigo-700 via-indigo-800 to-indigo-900"
        }`}
      >
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-64 h-64 bg-yellow-400 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-amber-400 rounded-full blur-3xl"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
              Our Achievements
            </h2>
            <p className="text-base text-indigo-100">
              Trusted by thousands of satisfied customers
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-lg rounded-xl p-6 text-center border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105"
              >
                <div
                  className={`inline-flex p-3 rounded-full bg-gradient-to-r ${stat.color} text-white mb-3`}
                >
                  {stat.icon}
                </div>
                <div className="text-3xl md:text-4xl font-bold text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-sm md:text-base text-indigo-100">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const Testimonials = () => {
    return (
      <div
        className={`py-20 relative overflow-hidden ${
          darkMode
            ? "bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900"
            : "bg-gradient-to-b from-amber-50 via-stone-100 to-amber-50"
        }`}
      >
        {/* Decorative Background Elements */}
        <div className="absolute inset-0 overflow-hidden opacity-20">
          <div className="absolute top-20 left-10 w-64 h-64 bg-amber-300 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-64 h-64 bg-indigo-300 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 mb-4">
              <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
              <span className="text-sm font-semibold">Customer Reviews</span>
            </div>
            <h2
              className={`text-4xl md:text-5xl font-bold mb-4 ${
            darkMode ? "text-white" : "text-gray-900"
          }`}
        >
          What Our Customers Say
        </h2>
            <p
              className={`text-xl ${
                darkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Trusted by thousands of satisfied customers
            </p>
          </div>

          {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
                className={`group relative ${
                  darkMode ? "bg-gray-800" : "bg-gradient-to-br from-stone-50 via-amber-50/30 to-stone-100"
                } p-8 rounded-2xl shadow-xl border-2 ${
                  darkMode ? "border-gray-700" : "border-amber-200"
                } hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2`}
              >
                {/* Decorative Top Border */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-400 rounded-t-2xl"></div>

                {/* Quote Icon */}
                <div className="absolute top-6 right-6 opacity-10">
                  <div className="text-6xl font-serif text-amber-400 dark:text-amber-500">
                    "
                  </div>
                </div>

                {/* Rating Stars */}
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                      className="w-5 h-5 fill-amber-400 text-amber-400"
                  />
                ))}
              </div>

                {/* Testimonial Text */}
                <p
                  className={`text-lg mb-6 leading-relaxed relative z-10 ${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  {testimonial.text}
                </p>

                {/* Customer Name */}
                <div className="flex items-center gap-3 pt-4 border-t border-amber-100 dark:border-gray-700">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-400 to-yellow-500 flex items-center justify-center text-white font-bold text-lg">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <p
                      className={`font-bold text-lg ${
                        darkMode ? "text-amber-400" : "text-amber-600"
                      }`}
                    >
                      {testimonial.name}
                    </p>
                    <p
                      className={`text-sm ${
                        darkMode ? "text-gray-400" : "text-gray-500"
                      }`}
                    >
                      Verified Customer
                    </p>
                  </div>
                </div>
            </div>
          ))}
        </div>

          {/* Trust Badge */}
          <div className="mt-16 text-center">
            <div
              className={`inline-flex items-center gap-3 px-6 py-3 rounded-full ${
                darkMode
                  ? "bg-gray-800 border border-gray-700"
                  : "bg-gradient-to-br from-stone-50 to-amber-50 border border-amber-300 shadow-lg"
              }`}
            >
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 fill-amber-400 text-amber-400"
                  />
                ))}
              </div>
              <span
                className={`font-semibold ${
                  darkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                <span className="text-amber-500">4.9</span> / 5.0 Average Rating
              </span>
            </div>
          </div>
      </div>
    </div>
  );
  };

  const Footer = () => (
    <footer
      className={`${
        darkMode ? "bg-gray-900" : "bg-indigo-900"
      } text-white py-12`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-amber-600 via-yellow-500 to-amber-700 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-yellow-400 text-3xl font-bold">D</span>
              </div>
              <h3 className="text-3xl font-bold text-yellow-400">Dwarika</h3>
            </div>
            <p className="text-gray-300">
              Your trusted partner for exquisite gold jewelry since 1990.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => setCurrentPage("home")}
                  className="text-gray-300 hover:text-yellow-400"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentPage("about")}
                  className="text-gray-300 hover:text-yellow-400"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentPage("contact")}
                  className="text-gray-300 hover:text-yellow-400"
                >
                  Contact
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentPage("products")}
                  className="text-gray-300 hover:text-yellow-400"
                >
                  Products
                </button>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Categories</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-300 hover:text-yellow-400">
                  Necklaces
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-yellow-400">
                  Rings
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-yellow-400">
                  Bangles
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-yellow-400">
                  Earrings
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <ul className="space-y-3">
              <li className="flex items-center space-x-2">
                <Phone className="w-5 h-5 text-yellow-400" />
                <span className="text-gray-300">+977 1234567890</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="w-5 h-5 text-yellow-400" />
                <span className="text-gray-300">info@dwarika.com</span>
              </li>
              <li className="flex items-center space-x-2">
                <MapPin className="w-5 h-5 text-yellow-400" />
                <span className="text-gray-300">Patan, Nepal</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-indigo-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2025 Dwarika Gold Shop. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );

  const AboutPage = () => (
    <div className={`min-h-screen ${darkMode ? "bg-gray-900" : "bg-gradient-to-b from-stone-100 via-stone-50 to-stone-100"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1
          className={`text-5xl font-bold text-center mb-12 ${
            darkMode ? "text-white" : "text-gray-900"
          }`}
        >
          About Dwarika
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <img
              src="https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&h=600&fit=crop"
              alt="Jewelry"
              className="rounded-xl shadow-2xl"
            />
          </div>
          <div>
            <h2
              className={`text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-700`}
            >
              Our Story
            </h2>
            <p
              className={`text-lg mb-4 ${
                darkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Established in 1990, Dwarika has been serving the community with
              authentic and exquisite gold jewelry for over three decades. Our
              commitment to quality and craftsmanship has made us one of the
              most trusted names in the industry.
            </p>
            <p
              className={`text-lg mb-4 ${
                darkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Every piece of jewelry at Dwarika is crafted with precision and
              passion by our skilled artisans. We blend traditional
              craftsmanship with modern designs to create timeless pieces that
              celebrate your special moments.
            </p>
            <p
              className={`text-lg ${
                darkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              From bridal collections to everyday elegance, we offer a wide
              range of jewelry that caters to every taste and occasion. Visit us
              and experience the Dwarika difference.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const ContactPage = () => (
    <div className={`min-h-screen ${darkMode ? "bg-gray-900" : "bg-gradient-to-b from-stone-100 via-stone-50 to-stone-100"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1
          className={`text-5xl font-bold text-center mb-12 ${
            darkMode ? "text-white" : "text-gray-900"
          }`}
        >
          Contact Us
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h2
              className={`text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-700`}
            >
              Get In Touch
            </h2>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="bg-amber-600 p-3 rounded-full">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3
                    className={`text-xl font-semibold mb-2 ${
                      darkMode ? "text-white" : "text-gray-900"
                    }`}
                  >
                    Phone
                  </h3>
                  <p className={darkMode ? "text-gray-300" : "text-gray-600"}>
                    +977 1234567890
                  </p>
                  <p className={darkMode ? "text-gray-300" : "text-gray-600"}>
                    +977 0987654321
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="bg-amber-600 p-3 rounded-full">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3
                    className={`text-xl font-semibold mb-2 ${
                      darkMode ? "text-white" : "text-gray-900"
                    }`}
                  >
                    Email
                  </h3>
                  <p className={darkMode ? "text-gray-300" : "text-gray-600"}>
                    info@dwarika.com
                  </p>
                  <p className={darkMode ? "text-gray-300" : "text-gray-600"}>
                    support@dwarika.com
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="bg-amber-600 p-3 rounded-full">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3
                    className={`text-xl font-semibold mb-2 ${
                      darkMode ? "text-white" : "text-gray-900"
                    }`}
                  >
                    Address
                  </h3>
                  <p className={darkMode ? "text-gray-300" : "text-gray-600"}>
                    Main Street, Patan
                  </p>
                  <p className={darkMode ? "text-gray-300" : "text-gray-600"}>
                    Bagmati Province, Nepal
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div
            className={`${
              darkMode ? "bg-gray-800" : "bg-amber-50"
            } p-8 rounded-xl`}
          >
            <h3
              className={`text-2xl font-bold mb-6 ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Send us a message
            </h3>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Your Name"
                className={`w-full p-3 rounded-lg ${
                  darkMode ? "bg-gray-900 text-white" : "bg-stone-50"
                } border ${
                  darkMode ? "border-gray-700" : "border-amber-200"
                } focus:outline-none focus:ring-2 focus:ring-amber-600`}
              />
              <input
                type="email"
                placeholder="Your Email"
                className={`w-full p-3 rounded-lg ${
                  darkMode ? "bg-gray-900 text-white" : "bg-stone-50"
                } border ${
                  darkMode ? "border-gray-700" : "border-amber-200"
                } focus:outline-none focus:ring-2 focus:ring-amber-600`}
              />
              <input
                type="tel"
                placeholder="Your Phone"
                className={`w-full p-3 rounded-lg ${
                  darkMode ? "bg-gray-900 text-white" : "bg-stone-50"
                } border ${
                  darkMode ? "border-gray-700" : "border-amber-200"
                } focus:outline-none focus:ring-2 focus:ring-amber-600`}
              />
              <textarea
                rows="4"
                placeholder="Your Message"
                className={`w-full p-3 rounded-lg ${
                  darkMode ? "bg-gray-900 text-white" : "bg-stone-50"
                } border ${
                  darkMode ? "border-gray-700" : "border-amber-200"
                } focus:outline-none focus:ring-2 focus:ring-amber-600`}
              ></textarea>
              <button
                onClick={() => alert("Message sent successfully!")}
                className="w-full bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-700 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
              >
                Send Message
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const ProductDetailModal = () => {
    const [quantity, setQuantity] = useState(1);

    if (!selectedProduct || !showProductDetail) return null;

    const handleAddToCart = () => {
      addToCart(selectedProduct, quantity);
      setShowProductDetail(false);
      setSelectedProduct(null);
      setQuantity(1);
    };

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
        <div
          className={`relative max-w-4xl w-full max-h-[90vh] overflow-y-auto ${
            darkMode ? "bg-gray-800" : "bg-gradient-to-br from-stone-50 via-stone-100 to-amber-50"
          } rounded-2xl shadow-2xl`}
        >
          <button
            onClick={() => {
              setShowProductDetail(false);
              setSelectedProduct(null);
              setQuantity(1);
            }}
            className={`absolute top-4 right-4 p-2 rounded-full transition-colors z-10 ${
              darkMode
                ? "bg-gray-700 hover:bg-gray-600"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            <X className="w-6 h-6" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
            {/* Product Image */}
            <div className="relative">
              <img
                src={selectedProduct.image}
                alt={selectedProduct.name}
                className="w-full h-96 object-cover rounded-xl"
              />
            </div>

            {/* Product Details */}
            <div className="space-y-6">
              <div>
                <h2
                  className={`text-3xl font-bold mb-4 ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  {selectedProduct.name}
                </h2>
                <div className="flex items-center gap-2 mb-4">
                  {[...Array(selectedProduct.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                  <span
                    className={`ml-2 ${darkMode ? "text-gray-400" : "text-gray-600"}`}
                  >
                    ({selectedProduct.rating}.0)
                  </span>
                </div>
                <p className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600 mb-6">
                  ₹{selectedProduct.price.toLocaleString()}
                </p>
              </div>

              {/* Quantity Selector */}
              <div>
                <label
                  className={`block mb-2 font-semibold ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  Quantity
                </label>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className={`p-2 rounded-full transition-colors ${
                      darkMode
                        ? "bg-amber-900/30 text-amber-400 hover:bg-amber-900/50"
                        : "bg-amber-100 text-amber-700 hover:bg-amber-200"
                    }`}
                  >
                    <Minus className="w-5 h-5" />
                  </button>
                  <span
                    className={`text-2xl font-bold w-12 text-center ${
                      darkMode ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className={`p-2 rounded-full transition-colors ${
                      darkMode
                        ? "bg-amber-900/30 text-amber-400 hover:bg-amber-900/50"
                        : "bg-amber-100 text-amber-700 hover:bg-amber-200"
                    }`}
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Product Description */}
              <div>
                <h3
                  className={`font-semibold mb-2 ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  Description
                </h3>
                <p
                  className={`${darkMode ? "text-gray-300" : "text-gray-600"}`}
                >
                  Exquisitely crafted {selectedProduct.name.toLowerCase()} with
                  premium materials and traditional craftsmanship. This piece
                  combines elegance and durability, making it perfect for special
                  occasions and everyday wear.
                </p>
              </div>

              {/* Add to Cart Button */}
              <div className="flex gap-4 pt-4">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-700 text-white py-4 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <ShoppingCart className="w-5 h-5" />
                  Add to Cart - ₹{(selectedProduct.price * quantity).toLocaleString()}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const SearchResultsPage = () => {
    const searchResults = getFilteredProducts();

    return (
      <div className={`min-h-screen ${darkMode ? "bg-gray-900" : "bg-gradient-to-b from-stone-100 via-stone-50 to-stone-100"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h1
            className={`text-5xl font-bold text-center mb-4 ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            {searchQuery.trim() ? "Search Results" : "All Products"}
          </h1>
          <p
            className={`text-xl text-center mb-12 ${
              darkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            {searchQuery.trim()
              ? `Showing results for "${searchQuery}"`
              : "Browse our complete collection"}
          </p>

          {searchResults.length === 0 ? (
            <div className="text-center py-12">
              <p
                className={`text-2xl mb-4 ${
                  darkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                No products found matching "{searchQuery}"
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setCurrentPage("home");
                }}
                className="bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-700 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-300"
              >
                Back to Home
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {searchResults.map((product) => (
                <div
                  key={product.id}
                  className={`${
                    darkMode ? "bg-gray-800" : "bg-gradient-to-br from-stone-50 to-amber-50/30"
                  } rounded-xl shadow-xl overflow-hidden transform hover:scale-105 transition-all duration-300 border-2 ${
                    darkMode ? "border-gray-700" : "border-amber-200"
                  }`}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-64 object-cover"
                  />
                  <div className="p-6">
                    <h3
                      className={`text-xl font-bold mb-2 ${
                        darkMode ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {product.name}
                    </h3>
                    <div className="flex items-center mb-3">
                      {[...Array(product.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-5 h-5 fill-yellow-400 text-yellow-400"
                        />
                      ))}
                    </div>
                    <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600 mb-4">
                      ₹{product.price.toLocaleString()}
                    </p>
                    <button
                      onClick={() => {
                        setSelectedProduct(product);
                        setShowProductDetail(true);
                      }}
                      className="w-full bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-700 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  const CartPage = () => {
    if (cart.length === 0) {
  return (
        <div className={`min-h-screen ${darkMode ? "bg-gray-900" : "bg-gradient-to-b from-stone-100 via-stone-50 to-stone-100"}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="text-center">
              <ShoppingCart className="w-24 h-24 mx-auto mb-6 text-gray-400" />
              <h2
                className={`text-3xl font-bold mb-4 ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                Your cart is empty
              </h2>
              <p
                className={`text-xl mb-8 ${
                  darkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Start adding products to your cart!
              </p>
              <button
                onClick={() => setCurrentPage("products")}
                className="bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-700 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-300"
              >
                Browse Products
              </button>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className={`min-h-screen ${darkMode ? "bg-gray-900" : "bg-gradient-to-b from-stone-100 via-stone-50 to-stone-100"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <h1
            className={`text-4xl font-bold mb-8 ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Shopping Cart
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cart.map((item) => (
                <div
                  key={item.product.id}
                  className={`${
                    darkMode ? "bg-gray-800" : "bg-gradient-to-br from-stone-50 to-amber-50/30"
                  } rounded-xl shadow-lg p-6 border-2 ${
                    darkMode ? "border-gray-700" : "border-amber-200"
                  }`}
                >
                  <div className="flex gap-6">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-32 h-32 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3
                        className={`text-xl font-bold mb-2 ${
                          darkMode ? "text-white" : "text-gray-900"
                        }`}
                      >
                        {item.product.name}
                      </h3>
                      <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600 mb-4">
                        ₹{item.product.price.toLocaleString()}
                      </p>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-4">
                        <span
                          className={`font-semibold ${
                            darkMode ? "text-gray-300" : "text-gray-700"
                          }`}
                        >
                          Quantity:
                        </span>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() =>
                              updateCartQuantity(item.product.id, item.quantity - 1)
                            }
                            className={`p-1 rounded-full ${
                              darkMode
                                ? "bg-amber-900/30 text-amber-400 hover:bg-amber-900/50"
                                : "bg-amber-100 text-amber-700 hover:bg-amber-200"
                            }`}
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span
                            className={`w-8 text-center font-bold ${
                              darkMode ? "text-white" : "text-gray-900"
                            }`}
                          >
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateCartQuantity(item.product.id, item.quantity + 1)
                            }
                            className={`p-1 rounded-full ${
                              darkMode
                                ? "bg-amber-900/30 text-amber-400 hover:bg-amber-900/50"
                                : "bg-amber-100 text-amber-700 hover:bg-amber-200"
                            }`}
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className={`ml-auto p-2 text-red-500 rounded-lg transition-colors ${
                            darkMode ? "hover:bg-red-900/20" : "hover:bg-red-50"
                          }`}
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                      <p
                        className={`mt-4 text-lg font-semibold ${
                          darkMode ? "text-gray-300" : "text-gray-700"
                        }`}
                      >
                        Subtotal: ₹{(item.product.price * item.quantity).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div
                className={`sticky top-24 ${
                  darkMode ? "bg-gray-800" : "bg-gradient-to-br from-stone-50 via-amber-50/20 to-stone-100"
                } rounded-xl shadow-lg p-6 border-2 ${
                  darkMode ? "border-gray-700" : "border-amber-200"
                }`}
              >
                <h2
                  className={`text-2xl font-bold mb-6 ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  Order Summary
                </h2>
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span
                      className={darkMode ? "text-gray-300" : "text-gray-600"}
                    >
                      Subtotal ({getCartItemCount()} items)
                    </span>
                    <span
                      className={`font-semibold ${
                        darkMode ? "text-white" : "text-gray-900"
                      }`}
                    >
                      ₹{getCartTotal().toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span
                      className={darkMode ? "text-gray-300" : "text-gray-600"}
                    >
                      Shipping
                    </span>
                    <span
                      className={`font-semibold ${
                        darkMode ? "text-white" : "text-gray-900"
                      }`}
                    >
                      ₹500
                    </span>
                  </div>
                  <div className={`border-t pt-4 ${
                    darkMode ? "border-gray-600" : "border-gray-300"
                  }`}>
                    <div className="flex justify-between">
                      <span
                        className={`text-xl font-bold ${
                          darkMode ? "text-white" : "text-gray-900"
                        }`}
                      >
                        Total
                      </span>
                      <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">
                        ₹{(getCartTotal() + 500).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setCurrentPage("checkout")}
                  className="w-full bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-700 text-white py-4 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
                >
                  Proceed to Checkout
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const CheckoutPage = () => {
    const [formData, setFormData] = useState({
      fullName: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
    });

    const handleInputChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      setCurrentPage("payment");
    };

    if (cart.length === 0) {
      return (
        <div className={`min-h-screen ${darkMode ? "bg-gray-900" : "bg-gradient-to-b from-stone-100 via-stone-50 to-stone-100"}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="text-center">
              <h2
                className={`text-3xl font-bold mb-4 ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                Your cart is empty
              </h2>
              <button
                onClick={() => setCurrentPage("products")}
                className="bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-700 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-300"
              >
                Browse Products
              </button>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className={`min-h-screen ${darkMode ? "bg-gray-900" : "bg-gradient-to-b from-stone-100 via-stone-50 to-stone-100"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <h1
            className={`text-4xl font-bold mb-8 ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Checkout
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Checkout Form */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div
                  className={`${
                    darkMode ? "bg-gray-800" : "bg-gradient-to-br from-stone-50 to-amber-50/30"
                  } rounded-xl shadow-lg p-6 border-2 ${
                    darkMode ? "border-gray-700" : "border-amber-200"
                  }`}
                >
                  <h2
                    className={`text-2xl font-bold mb-6 ${
                      darkMode ? "text-white" : "text-gray-900"
                    }`}
                  >
                    Shipping Information
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label
                        className={`block mb-2 font-semibold ${
                          darkMode ? "text-white" : "text-gray-900"
                        }`}
                      >
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        required
                        value={formData.fullName}
                        onChange={handleInputChange}
                        className={`w-full p-3 rounded-lg border ${
                          darkMode
                            ? "bg-gray-900 text-white border-gray-700"
                            : "bg-stone-50 border-amber-200"
                        } focus:outline-none focus:ring-2 focus:ring-amber-600`}
                      />
                    </div>
                    <div>
                      <label
                        className={`block mb-2 font-semibold ${
                          darkMode ? "text-white" : "text-gray-900"
                        }`}
                      >
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`w-full p-3 rounded-lg border ${
                          darkMode
                            ? "bg-gray-900 text-white border-gray-700"
                            : "bg-stone-50 border-amber-200"
                        } focus:outline-none focus:ring-2 focus:ring-amber-600`}
                      />
                    </div>
                    <div>
                      <label
                        className={`block mb-2 font-semibold ${
                          darkMode ? "text-white" : "text-gray-900"
                        }`}
                      >
                        Phone *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleInputChange}
                        className={`w-full p-3 rounded-lg border ${
                          darkMode
                            ? "bg-gray-900 text-white border-gray-700"
                            : "bg-stone-50 border-amber-200"
                        } focus:outline-none focus:ring-2 focus:ring-amber-600`}
                      />
                    </div>
                    <div>
                      <label
                        className={`block mb-2 font-semibold ${
                          darkMode ? "text-white" : "text-gray-900"
                        }`}
                      >
                        City *
                      </label>
                      <input
                        type="text"
                        name="city"
                        required
                        value={formData.city}
                        onChange={handleInputChange}
                        className={`w-full p-3 rounded-lg border ${
                          darkMode
                            ? "bg-gray-900 text-white border-gray-700"
                            : "bg-stone-50 border-amber-200"
                        } focus:outline-none focus:ring-2 focus:ring-amber-600`}
                      />
                    </div>
                    <div>
                      <label
                        className={`block mb-2 font-semibold ${
                          darkMode ? "text-white" : "text-gray-900"
                        }`}
                      >
                        State *
                      </label>
                      <input
                        type="text"
                        name="state"
                        required
                        value={formData.state}
                        onChange={handleInputChange}
                        className={`w-full p-3 rounded-lg border ${
                          darkMode
                            ? "bg-gray-900 text-white border-gray-700"
                            : "bg-stone-50 border-amber-200"
                        } focus:outline-none focus:ring-2 focus:ring-amber-600`}
                      />
                    </div>
                    <div>
                      <label
                        className={`block mb-2 font-semibold ${
                          darkMode ? "text-white" : "text-gray-900"
                        }`}
                      >
                        ZIP Code *
                      </label>
                      <input
                        type="text"
                        name="zipCode"
                        required
                        value={formData.zipCode}
                        onChange={handleInputChange}
                        className={`w-full p-3 rounded-lg border ${
                          darkMode
                            ? "bg-gray-900 text-white border-gray-700"
                            : "bg-stone-50 border-amber-200"
                        } focus:outline-none focus:ring-2 focus:ring-amber-600`}
                      />
                    </div>
                  </div>
                  <div className="mt-4">
                    <label
                      className={`block mb-2 font-semibold ${
                        darkMode ? "text-white" : "text-gray-900"
                      }`}
                    >
                      Address *
                    </label>
                    <textarea
                      name="address"
                      required
                      rows="3"
                      value={formData.address}
                      onChange={handleInputChange}
                      className={`w-full p-3 rounded-lg border ${
                        darkMode
                          ? "bg-gray-900 text-white border-gray-700"
                          : "bg-stone-50 border-amber-200"
                      } focus:outline-none focus:ring-2 focus:ring-amber-600`}
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-700 text-white py-4 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
                >
                  Continue to Payment
                  <ArrowRight className="w-5 h-5" />
                </button>
              </form>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div
                className={`sticky top-24 ${
                  darkMode ? "bg-gray-800" : "bg-gradient-to-br from-stone-50 via-amber-50/20 to-stone-100"
                } rounded-xl shadow-lg p-6 border-2 ${
                  darkMode ? "border-gray-700" : "border-amber-200"
                }`}
              >
                <h2
                  className={`text-2xl font-bold mb-6 ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  Order Summary
                </h2>
                <div className="space-y-4 mb-6">
                  {cart.map((item) => (
                    <div key={item.product.id} className="flex justify-between">
                      <span
                        className={darkMode ? "text-gray-300" : "text-gray-600"}
                      >
                        {item.product.name} x{item.quantity}
                      </span>
                      <span
                        className={`font-semibold ${
                          darkMode ? "text-white" : "text-gray-900"
                        }`}
                      >
                        ₹{(item.product.price * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  ))}
                  <div className={`border-t pt-4 space-y-2 ${
                    darkMode ? "border-gray-600" : "border-gray-300"
                  }`}>
                    <div className="flex justify-between">
                      <span
                        className={darkMode ? "text-gray-300" : "text-gray-600"}
                      >
                        Subtotal
                      </span>
                      <span
                        className={`font-semibold ${
                          darkMode ? "text-white" : "text-gray-900"
                        }`}
                      >
                        ₹{getCartTotal().toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span
                        className={darkMode ? "text-gray-300" : "text-gray-600"}
                      >
                        Shipping
                      </span>
                      <span
                        className={`font-semibold ${
                          darkMode ? "text-white" : "text-gray-900"
                        }`}
                      >
                        ₹500
                      </span>
                    </div>
                    <div className={`flex justify-between pt-2 border-t ${
                      darkMode ? "border-gray-600" : "border-gray-300"
                    }`}>
                      <span
                        className={`text-xl font-bold ${
                          darkMode ? "text-white" : "text-gray-900"
                        }`}
                      >
                        Total
                      </span>
                      <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">
                        ₹{(getCartTotal() + 500).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const PaymentPage = () => {
    const [paymentMethod, setPaymentMethod] = useState("cash");

    const handlePayment = (e) => {
      e.preventDefault();
      alert("Order placed successfully! You will pay ₹" + (getCartTotal() + 500).toLocaleString() + " on delivery.");
      setCart([]);
      setCurrentPage("home");
    };

    if (cart.length === 0) {
      return (
        <div className={`min-h-screen ${darkMode ? "bg-gray-900" : "bg-gradient-to-b from-stone-100 via-stone-50 to-stone-100"}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="text-center">
              <h2
                className={`text-3xl font-bold mb-4 ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                Your cart is empty
              </h2>
              <button
                onClick={() => setCurrentPage("products")}
                className="bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-700 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-300"
              >
                Browse Products
              </button>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className={`min-h-screen ${darkMode ? "bg-gray-900" : "bg-gradient-to-b from-stone-100 via-stone-50 to-stone-100"}`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="flex items-center justify-center mb-8">
            <Wallet className="w-8 h-8 text-amber-600 mr-2" />
            <h1
              className={`text-4xl font-bold ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Payment
            </h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Payment Form */}
            <div className="lg:col-span-2">
              <form onSubmit={handlePayment} className="space-y-6">
                <div
                  className={`${
                    darkMode ? "bg-gray-800" : "bg-gradient-to-br from-stone-50 to-amber-50/30"
                  } rounded-xl shadow-lg p-6 border-2 ${
                    darkMode ? "border-gray-700" : "border-amber-200"
                  }`}
                >
                  <h2
                    className={`text-2xl font-bold mb-6 ${
                      darkMode ? "text-white" : "text-gray-900"
                    }`}
                  >
                    Select Payment Method
                  </h2>
                  
                  {/* Payment Method Options */}
                  <div className="space-y-4 mb-6">
                    {/* Cash on Delivery */}
                    <div
                      onClick={() => setPaymentMethod("cash")}
                      className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                        paymentMethod === "cash"
                          ? darkMode
                            ? "border-amber-500 bg-amber-900/20"
                            : "border-amber-600 bg-amber-50"
                          : darkMode
                          ? "border-gray-700 hover:border-gray-600"
                          : "border-amber-200 hover:border-amber-300"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div
                            className={`p-3 rounded-full ${
                              paymentMethod === "cash"
                                ? "bg-amber-600 text-white"
                                : darkMode
                                ? "bg-gray-700 text-gray-400"
                                : "bg-gray-200 text-gray-600"
                            }`}
                          >
                            <Wallet className="w-6 h-6" />
                          </div>
                          <div>
                            <h3
                              className={`text-lg font-bold ${
                                darkMode ? "text-white" : "text-gray-900"
                              }`}
                            >
                              Cash on Delivery
                            </h3>
                            <p
                              className={`text-sm ${
                                darkMode ? "text-gray-400" : "text-gray-600"
                              }`}
                            >
                              Pay when you receive your order
                            </p>
                          </div>
                        </div>
                        <div
                          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                            paymentMethod === "cash"
                              ? "border-amber-600 bg-amber-600"
                              : darkMode
                              ? "border-gray-600"
                              : "border-gray-300"
                          }`}
                        >
                          {paymentMethod === "cash" && (
                            <div className="w-2 h-2 rounded-full bg-white"></div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Card Payment - Coming Soon */}
                    <div
                      className={`p-4 rounded-xl border-2 ${
                        darkMode
                          ? "border-gray-700 bg-gray-800/50 opacity-60"
                          : "border-gray-200 bg-gray-50 opacity-60"
                      } relative`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div
                            className={`p-3 rounded-full ${
                              darkMode ? "bg-gray-700 text-gray-500" : "bg-gray-200 text-gray-400"
                            }`}
                          >
                            <CreditCard className="w-6 h-6" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h3
                                className={`text-lg font-bold ${
                                  darkMode ? "text-gray-500" : "text-gray-400"
                                }`}
                              >
                                Card Payment
                              </h3>
                              <span className="px-2 py-1 text-xs font-bold bg-yellow-400 text-yellow-900 rounded-full flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                Coming Soon
                              </span>
                            </div>
                            <p
                              className={`text-sm ${
                                darkMode ? "text-gray-500" : "text-gray-400"
                              }`}
                            >
                              Credit/Debit card payment will be available soon
                            </p>
                          </div>
                        </div>
                        <div
                          className={`w-5 h-5 rounded-full border-2 ${
                            darkMode ? "border-gray-600" : "border-gray-300"
                          }`}
                        ></div>
                      </div>
                    </div>
                  </div>

                  {/* Cash on Delivery Message */}
                  {paymentMethod === "cash" && (
                    <div
                      className={`p-4 rounded-lg ${
                        darkMode ? "bg-amber-900/30" : "bg-amber-50"
                      } border ${
                        darkMode ? "border-amber-700" : "border-amber-200"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <Wallet className={`w-5 h-5 mt-0.5 ${
                          darkMode ? "text-amber-400" : "text-amber-700"
                        }`} />
                        <div>
                          <p
                            className={`font-semibold ${
                              darkMode ? "text-amber-300" : "text-amber-900"
                            }`}
                          >
                            Cash on Delivery Selected
                          </p>
                          <p
                            className={`text-sm mt-1 ${
                              darkMode ? "text-amber-200" : "text-amber-700"
                            }`}
                          >
                            You will pay ₹{(getCartTotal() + 500).toLocaleString()} when your order is delivered.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-700 text-white py-4 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <Wallet className="w-5 h-5" />
                  Place Order - Pay ₹{(getCartTotal() + 500).toLocaleString()} on Delivery
                </button>
              </form>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div
                className={`sticky top-24 ${
                  darkMode ? "bg-gray-800" : "bg-gradient-to-br from-stone-50 via-amber-50/20 to-stone-100"
                } rounded-xl shadow-lg p-6 border-2 ${
                  darkMode ? "border-gray-700" : "border-amber-200"
                }`}
              >
                <h2
                  className={`text-2xl font-bold mb-6 ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  Order Summary
                </h2>
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span
                      className={darkMode ? "text-gray-300" : "text-gray-600"}
                    >
                      Subtotal
                    </span>
                    <span
                      className={`font-semibold ${
                        darkMode ? "text-white" : "text-gray-900"
                      }`}
                    >
                      ₹{getCartTotal().toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span
                      className={darkMode ? "text-gray-300" : "text-gray-600"}
                    >
                      Shipping
                    </span>
                    <span
                      className={`font-semibold ${
                        darkMode ? "text-white" : "text-gray-900"
                      }`}
                    >
                      ₹500
                    </span>
                  </div>
                  <div className={`border-t pt-4 ${
                    darkMode ? "border-gray-600" : "border-gray-300"
                  }`}>
                    <div className="flex justify-between">
                      <span
                        className={`text-xl font-bold ${
                          darkMode ? "text-white" : "text-gray-900"
                        }`}
                      >
                        Total
                      </span>
                      <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">
                        ₹{(getCartTotal() + 500).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const ProductsPage = () => {
    const [selectedCategory, setSelectedCategory] = useState("All");
    const categories = ["All", "Necklaces", "Rings", "Bangles", "Earrings", "Bridal Sets", "Chains"];

    const filteredProducts =
      selectedCategory === "All"
        ? products
        : products.filter((p) =>
            p.name.toLowerCase().includes(selectedCategory.toLowerCase())
          );

    return (
      <div className={`min-h-screen ${darkMode ? "bg-gray-900" : "bg-gradient-to-b from-stone-100 via-stone-50 to-stone-100"}`}>
        <div className={`py-20 ${darkMode ? "bg-gray-900" : "bg-gradient-to-b from-stone-100 to-stone-50"}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h1
                className={`text-4xl md:text-5xl font-bold mb-4 ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                All Products
              </h1>
              <p
                className={`text-xl ${
                  darkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Browse our complete collection of exquisite jewelry
              </p>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
                    selectedCategory === category
                      ? "bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-700 text-white shadow-lg scale-105"
                      : darkMode
                      ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                      : "bg-stone-100 text-gray-800 hover:bg-amber-100 border border-amber-200"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className={`group relative ${
                    darkMode ? "bg-gray-800" : "bg-gradient-to-br from-stone-50 via-amber-50/20 to-stone-100"
                  } rounded-2xl overflow-hidden shadow-xl transform hover:scale-105 transition-all duration-300 border-2 ${
                    darkMode ? "border-gray-700" : "border-amber-200"
                  } hover:shadow-2xl`}
                >
                  <div className="relative h-72 overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 right-4">
                      <button className="p-2 rounded-full bg-stone-100/90 backdrop-blur-sm hover:bg-stone-200 transition-colors shadow-lg">
                        <Heart className="w-5 h-5 text-gray-600 hover:text-red-500" />
                      </button>
                    </div>
                    {product.rating === 5 && (
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 rounded-full bg-yellow-400 text-yellow-900 text-xs font-bold flex items-center gap-1">
                          <Star className="w-3 h-3 fill-yellow-900" />
                          Top Rated
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <h3
                      className={`text-xl font-bold mb-2 ${
                        darkMode ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {product.name}
                    </h3>
                    <div className="flex items-center gap-1 mb-3">
                      {[...Array(product.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-5 h-5 fill-yellow-400 text-yellow-400"
                        />
                      ))}
                      <span
                        className={`ml-2 text-sm ${
                          darkMode ? "text-gray-400" : "text-gray-600"
                        }`}
                      >
                        ({product.rating}.0)
                      </span>
                    </div>
                    <div className="flex items-center justify-between mb-4">
                      <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">
                        ₹{product.price.toLocaleString()}
                      </p>
                      <button className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                        darkMode 
                          ? "bg-amber-900/30 text-amber-400 hover:bg-amber-900/50" 
                          : "bg-amber-100 text-amber-700 hover:bg-amber-200"
                      }`}>
                        <ShoppingBag className="w-5 h-5" />
                      </button>
                    </div>
                    <button
                      onClick={() => {
                        setSelectedProduct(product);
                        setShowProductDetail(true);
                      }}
                      className="w-full bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-700 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 group/btn"
                    >
                      View Details
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <p
                  className={`text-2xl mb-4 ${
                    darkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  No products found in {selectedCategory} category
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={`min-h-screen ${darkMode ? "bg-gray-900" : "bg-gradient-to-b from-stone-100 via-stone-50 to-stone-100"}`}>
      <Navbar />
      {currentPage === "home" && (
        <>
          <Hero />
          <Statistics />
          <FeaturedCollection />
          <Testimonials />
        </>
      )}
      {currentPage === "products" && <ProductsPage />}
      {currentPage === "cart" && <CartPage />}
      {currentPage === "checkout" && <CheckoutPage />}
      {currentPage === "payment" && <PaymentPage />}
      {currentPage === "about" && <AboutPage />}
      {currentPage === "contact" && <ContactPage />}
      {currentPage === "search" && <SearchResultsPage />}
      <Footer />
      {showProductDetail && <ProductDetailModal />}
    </div>
  );
}

export default App;
