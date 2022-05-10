const CalculatorForm = ({
    type,
    totalCap,
    basicCap,
    upperCap,
    cost,
    helper,
    cooker,
    penalty,
    loan,
    level,
    submitHandler
}) => {
    
    return (
        <form onSubmit={ (event) => submitHandler(event) }>
            <fieldset>
                <div>
                    <label></label>
                    <div>
                        <select>
                            
                        </select>
                    </div>
                </div>
            </fieldset>
            <button>계산하기</button>
        </form>
    );
};

export default CalculatorForm;