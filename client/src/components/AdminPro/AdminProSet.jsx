import { useDispatch } from "react-redux";
import { setToAdmin ,getUsers } from "../../actions";


export default function AdminProSet(props) {
  const dispatch = useDispatch();

  const users = props.users;
  const setChanged = props.setChanged;
  const changed = props.changed;
  //console.log("changed es: ", changed);
 var userIds = [];

  function toogleAdmin(e, users) {
    users.forEach(usuario => {
    userIds.push(  usuario._id );
   
    });
     dispatch(setToAdmin(userIds))
     setTimeout(function(){
      dispatch(getUsers())
    }, 500);
    setChanged(!changed);
   // console.log("changed AHORA ES es: ", changed);
    userIds = [];
  }

  return (
    <div>
      <button onClick={(e) => toogleAdmin(e, users)}>
       Otorgar/Quitar Permiso de Administrador
      </button>
    </div>
  );
}