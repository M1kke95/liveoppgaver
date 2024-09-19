import Student, { studentType } from "./student";

export default function Avatar(props: studentType){
    const nameArray = [props.name]

    const firstLetter = nameArray[0].charAt(0);
    
    return(
        <>
            <p className="avatar">{firstLetter}</p>
        </>
    )
}