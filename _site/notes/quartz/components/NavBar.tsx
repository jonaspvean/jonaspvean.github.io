import { QuartzComponent, QuartzComponentConstructor } from "./types"
import style from "./styles/navbar.scss"




export default (() => {
    const NavBar: QuartzComponent = () => {
    return (
    <header>
        <nav id="navbar" class="navbar navbar-light navbar-expand-sm fixed-top" role="navigation">
            <div class="container">
                <a class = "navbar-brand title font-weight-lighter" href ={`/`}>
                        <span class="font-weight-bold">Jonas </span>

                        Pedersen
                        Vean
                        
                </a>
            

            <div class="collapse navbar-collapse text-right" id="navbarNav">
                <ul class="navbar-nav ml-auto flex-nowrap">
                    <li class="nav-item">
                        <a class="nav-link" href="/">about
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/blog/">blog
                        </a>
                    </li>
                    <li class="nav-item active">

                        <a class="nav-link" href="notes/public/">research notes
                            <span class="sr-only">(current)</span>
                        </a>
                    </li>
                    <li class="nav-item ">
                        <a class="nav-link" href="/projects/">projects
                        </a>
                    </li>
                    <li class="nav-item ">
                        <a class="nav-link" href="/repositories/">repositories
                        </a>
                    </li>
                    <li class="nav-item ">
                        <a class="nav-link" href="/cv/">cv
                        </a>
                    </li>
                    
                </ul>
            </div>
            </div>
        </nav>
        

        <progress id="progress" value="0" style="top: 57px;" max="588">
            <div class="progress-container"> 
                <span class="progress-bar"></span>
            </div>
        </progress>
        
    </header>
    )
    }
    NavBar.css = style
    return NavBar
}) satisfies QuartzComponentConstructor
