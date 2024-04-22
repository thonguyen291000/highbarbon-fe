import RestaurantImage from "./assets/images/highbarbon.jpg";
import BranchImage from "./assets/images/ho-chi-minh.jpg";

export const sampleData = {
  branches: [
    {
      id: "ho-chi-minh",
      name: "Thành phố Hồ Chí Minh",
      restaurantAmount: 4,
      description: "",
      image: BranchImage,
    },
  ],
  restaurants: [
    {
      branchId: "ho-chi-minh",
      id: "ho-chi-minh-highbarbon",
      name: "HiHighBarBon Cocktail & Coffee (234 Cafe)",
      address:
        "331BC Đ. Trần Hưng Đạo, Phường Cô Giang, Quận 1, Thành phố Hồ Chí Minh",
      phoneNumber: "0379-598-459",
      image: RestaurantImage,
    },
  ],
  tables: [
    {
      branchId: "ho-chi-minh",
      restaurantId: "ho-chi-minh-highbarbon",
      id: "ho-chi-minh-highbarbon-1",
      name: "Bàn 1",
      description: "Nằm ở gần sát cửa ra vào, có ghế sofa",
      bookedAmount: 4,
      cashPerHour: 150,
      calendar: {
        1: true,
        2: true,
        3: true,
        4: true,
        5: false,
        6: false,
        7: false,
        8: false,
        9: false,
        10: false,
        11: false,
        12: false,
        13: false,
        14: false,
        15: false,
        16: false,
        17: false,
        18: false,
        19: false,
        20: false,
        21: false,
        22: false,
        23: false,
        24: false,
      },
    },
  ],
};
