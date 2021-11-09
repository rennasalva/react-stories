import './list.styles.css'
import Utility from '../../utility/index'
import Item from "./item.component";
import  {connect} from "react-redux";
import {selectStoriedData} from "../../redux/stories/stories.selectors";

const List = ({ list, onRemoveItem,handleSort, sort })=> {

    const handleSortList = (sortKey) => {
        const isReverse = sort.sortKey === sortKey && !sort.isReverse;
        handleSort(sortKey,isReverse);
    };


    const sortFunction = Utility.sortStories[sort.sortKey];
    const sortedList = sort.isReverse
        ? sortFunction(list).reverse()
        : sortFunction(list);


    return (
        <ul>
            <li style={{ display: 'flex' }}>
                <span style={{ width: '40%' }}>
                  <button className="button" type="button" onClick={() => handleSortList('TITLE')}>
                    Title
                  </button>
                </span>
                        <span style={{ width: '30%' }}>
                  <button className="button" type="button" onClick={() => handleSortList('AUTHOR')}>
                    Author
                  </button>
                </span>
                        <span style={{ width: '10%' }}>
                  <button className="button" type="button" onClick={() => handleSortList('COMMENT')}>
                    Comments
                  </button>
                </span>
                        <span style={{ width: '10%' }}>
                  <button className="button" type="button" onClick={() => handleSortList('POINT')}>
                    Ratings
                  </button>
                </span>
                <span style={{ width: '10%' }}>Actions</span>
            </li>

        {sortedList.map((item) => (
                <Item
                    key={item.objectID}
                    item={item}
                    onRemoveItem={onRemoveItem}
                />
            ))}
        </ul>
    );


}

/*
const mapStateToProps = (state) => (
    {
        list : state.stories.list,
    }
)
export default connect(mapStateToProps,null)(List);
 */

export default List;



