interface totalStudentProps {
    total: number;
}

export default function TotalStudents({ total }: totalStudentProps) {

    return(
        <p>{total}</p>
    )
}