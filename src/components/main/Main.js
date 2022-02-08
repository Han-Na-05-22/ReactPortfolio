import Header from '../common/Header';
import Visual from './Visual';
import Info from './Info';
import Intro from './Intro';

export default function Main(){
    return(
        <>
            <Header type={'main'} />
            <Visual />
            <Intro />
            <Info />
        </>
    );
}