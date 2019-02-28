import React from 'react'

const List = ({ companies, destory }) =>{
    return (
        <ul>
            {
                companies.map( company => {
                    return (
                        <li key={company.id}>{ company.name}
                        <button onClick={()=>destory(company.id)}>x</button>
                        </li>
                    )
                })
            }
        </ul>
    )
}

export default List;