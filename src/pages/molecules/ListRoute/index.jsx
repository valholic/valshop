import { Route, Routes } from "react-router-dom"
import { CosmeticProducts, DecorProducts, DrinkProducts, ElectronicProducts, FashionProducts, FoodProducts, FurnitureProducts, HealthProducts, Home, SportProducts } from "../../atoms"

export default function ListRoute() {
    return (
        <>
            <Routes>
                <Route path="/home" Component={Home} />
                <Route path="/home/cosmetic" Component={CosmeticProducts} />
                <Route path="/home/decor" Component={DecorProducts} />
                <Route path="/home/drink" Component={DrinkProducts} />
                <Route path="/home/electronic" Component={ElectronicProducts} />
                <Route path="/home/fashion" Component={FashionProducts} />
                <Route path="/home/food" Component={FoodProducts} />
                <Route path="/home/furniture" Component={FurnitureProducts} />
                <Route path="/home/health" Component={HealthProducts} />
                <Route path="/home/sport" Component={SportProducts} />
            </Routes>
        </>
    )
}
