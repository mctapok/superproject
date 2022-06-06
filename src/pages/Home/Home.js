import './Home.css'
import PostList from "../../components/PostList";

export default function Home() {
    return (
        <div className='home-page'>
            <div className="content-block">
                <h1>dashboard</h1>
                <PostList/>
            </div>

        </div>
    );
};
