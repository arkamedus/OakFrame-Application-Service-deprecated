import {StringTemplate} from "../../../lib/model/template/StringTemplate";
import {replaceAll} from "../../../lib/model/Utils";

export class Header extends StringTemplate {
    constructor() {
        super(`
<div class="navbar" id="navbar">
    <div class="navbar-inner container">
    <a class="site-title no-decoration" style="font-weight:bolder;" href="//{hostname}:8084/">
        <div class="left"><i class="fas fa-bezier-curve"></i><span class="hide-mobile"> OakFrame SPA</span></div>
    </a>
    <div class="dropdown right"><span><i class="fas fa-bars"></i></span>
        <div class="dropdown-content">
            <div class="dropdown-inner">
             
                <a href="//{hostname}:8084/blog">Blog</a><br>
                <a href="//{hostname}:8084/privacy">Privacy Policy</a><br>
          
           
            </div>
        </div>

    </div>

    <div class="right" id="pill-search-expand" style="z-index:-3;"><input id="pill-search" placeholder="Search ..."
                                                                          type="text"
                                                                          value="{search_safe}"><i
                id="pill-search-icon" class="fas fa-search"></i></div>

    <a href="/profile" class="right" style="z-index:-3;"><i class="far fa-user-circle"></i><span class="hide-mobile"> Sign Up</span></a><a href="/free-to-play-games" class="right" style="z-index:-3;"><i class="fas fa-ghost"></i><span class="hide-mobile"> Games</span></a>
    </div>
</div>
`);
    }
}