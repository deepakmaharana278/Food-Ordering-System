import React, { useEffect, useState } from "react";
import PublicLayout from "../components/PublicLayout";
import { Link } from "react-router-dom";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import "../styles/home.css";

const FoodList = () => {
  const [foods, setFoods] = useState([]);
  const [filteredFoods, setFilteredFoods] = useState([]);
  const [search, setSearch] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(200);
  const [currentPage, setCurrentPage] = useState(1);
  const foodPerpage = 9;

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/foods/`)
      .then((res) => res.json())
      .then((data) => {
        setFoods(data);
        setFilteredFoods(data);
      });

    fetch(`http://127.0.0.1:8000/api/manage-category/`)
      .then((res) => res.json())
      .then((data) => {
        setCategories(data);
      });
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    applyFilters(search, selectedCategory);
  };

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setSelectedCategory(category)
    applyFilters(search, category);
  };

  const applyFilters = (searchTerm, category) => {
      let result = foods;
      
      if (searchTerm) {
          result = result.filter(food => food.item_name.toLowerCase().includes(searchTerm.toLowerCase()));
      }
      if (category !== 'All') {
          result = result.filter(food => food.category === category);
      }
      result = result.filter(food => food.item_price >=minPrice &&  food.item_price <= maxPrice);
      setFilteredFoods(result);
      setCurrentPage(1);
    };
    
  // Pagination
  const indexOfLastFood = currentPage * foodPerpage; // 1 * 9
  const indexOfFirstFood = indexOfLastFood - foodPerpage; // 9 - 9 = 0
  const currentFoods = filteredFoods.slice(indexOfFirstFood, indexOfLastFood)
  const totalPages = Math.ceil(filteredFoods.length / foodPerpage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber)
  
  return (
    <PublicLayout>
      <div className="container p-5">
        <h2 className="text-center text-primary mb-4">Find Your Delicious Food Here...</h2>
        <div className="row">
          <div className="col-md-8">
            <form onSubmit={handleSearch}>
              <div className="input-group">
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="form-control"
                  placeholder="Enter your favourite food..."
              />
              <button
                type="submit"
                className="btn btn-primary"
              >
                <i className="fas fa-search"></i>
              </button>
              </div>
            </form>
          </div>
          <div className="col-md-4">
            <select
              value={selectedCategory}
              onChange={handleCategoryChange} className="form-select">
              <option value="All">All Category</option>
              
              {categories.map((cat) => (
                <option key={cat.id} value={cat.category_name}>{cat.category_name}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="row mb-4">
          <div className="col-md-12">
            <label className="form-label fw-bold my-2">Filter by Price: ₹{minPrice} - ₹{maxPrice}</label>
            <Slider
              range
              min={0}
              max={500}
              defaultValue={[minPrice, maxPrice]}
              onChange={(value) => {
                setMinPrice(value[0]);
                setMaxPrice(value[1]);
                applyFilters(search,selectedCategory)
              }}
            ></Slider>
          </div>
        </div>

        <div className="row mt-4">
          {currentFoods.length === 0 ? (
            <p className="text-center">No Foods Found</p>
          ) : (
            currentFoods.map((food) => (
              <div key={food.id} className="col-md-4 mb-4">
                <div className="card hovereffect">
                  <img src={`http://127.0.0.1:8000${food.image}`} className="card-img-top" alt={food.item_name} style={{ height: "180px" }} />
                  <div className="card-body">
                    <h5 className="card-title">
                      <Link to={`/food/${food.id}`}>{food.item_name}</Link>
                    </h5>
                    <p className="card-text text-muted">{food.item_description?.slice(0, 40)}...</p>
                    <div className="d-flex justify-content-between align-item-center">
                      <span className="fw-bold">₹ {food.item_price}</span>
                      {food.is_available ? (
                        <Link to={`/food/${food.id}`} className="btn btn-outline-primary btn-sm">
                          <i className="fas fa-shopping-basket me-2"></i>Order Now
                        </Link>
                      ) : (
                        <div title="This food item is not avilable right now.">
                          <button className="btn btn-outline-secondary btn-sm">
                            <i className="fas fa-times-circle me-2"></i>Currently Unavailable
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </PublicLayout>
  );
};

export default FoodList;
