import './ListaComponente.css'
const ListaComponente = (props) =>{
        const {item} = props;
        console.log('Render Test LiComponenente',item)
        //console.log('Li render componente',props);
        //console.log('Li render componente',item);
        return (
            <li key={item.objectID} className="news">
              <span>
                <a href={item.url}>{item.title}</a>
              </span>
                <span>{item.author}</span>
                <span>{item.num_comments}</span>
                <span>{item.points}</span>
            </li>
        );
};

export  default ListaComponente;
