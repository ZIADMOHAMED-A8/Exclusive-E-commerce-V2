export default function TopBar(){
    return (
        <nav className="flex justify-between px-16 pb-6 border-gray-300 items-center mt-6 border-b">
            <header className="text-3xl font-bold ">Exclusive</header>
            <ul className="flex gap-12 cursor-pointer">
                <li>Home</li>
                <li>About</li>
                <li>Sign up</li>
            </ul>
            <input type="search" className="bg-gray-200 h-12 pl-6 focus:outline-0 appearance-none ring-0 rounded-[5px]"></input>
        </nav>
    )
}