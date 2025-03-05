import Header from "../components/Header"
import SearchForm from "../components/SearchForm"

const HomeView = () => {
  return (
    <>
        <Header />
        <main className="bg-gray-100 py-10 min-h-screen bg-no-repeat ng-right-top lg:bg-home lg:bg-home-xl">
            <div className="mx-auto max-w-5xl mt-10">
                <div className="lg:w-1/2 px-10 lg:p-0 space-y-0">
                    <h1 className="text-6xl font-black">All your
                        <span className="text-cyan-400"> social Networks</span> in the same link
                    </h1>
                    <p className="text-slaye-800 text-xl pt-3">
                        Join over 200 thousand developers and share your profile on
                        Tiktok, Instagram, Facebook, Twitter, Github, Linkedin, and more.
                    </p>
                    <SearchForm />
                </div>
            </div>
        </main>
    </>
  )
}

export default HomeView