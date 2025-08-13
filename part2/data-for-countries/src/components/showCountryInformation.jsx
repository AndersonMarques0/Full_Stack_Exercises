const ShowCountryInformation = (props) => {
    const {array, index} = props
    
    return (
            <>
                <h1>{array[index].name.common}</h1>

                <p>
                    {array[index].capital}<br/>
                    Area {array[index].area}
                </p>

                <h2>Languages</h2>
                <ul>
                    {Object.values(array[index].languages).map(language => <li key={language} >{language}</li>)}
                </ul>

                <img 
                    src={array[index].flags.png} 
                    alt={array[index].flags.alt} 
                    style={{ width: '150px', height: 'auto', border: '1px solid #ccc' }} 
                />  
            </>
        )
        
}

export default ShowCountryInformation