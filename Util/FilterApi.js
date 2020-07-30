module.exports = class FilterAPI
{
    constructor(query , queryObj)
    {
        this.query = query;
        this.queryObj = queryObj;
    }

    filter()
    { 
        //HardCopyOfMainQuery
        let QueryObj = this.queryObj;
        //Excludquery
        const ExcludeFields = ['sort','limit','page','fields'];
        //ReFormateCondection BAy '$'
        let QueryString= JSON.stringify(QueryObj);
        QueryString= QueryString.replace(/\b(gte|gt|lt|lte)\b/g,match => `$${match}`);
        QueryObj = JSON.parse(QueryString);
        //ExcludeQueryfromQueryObj
        ExcludeFields.forEach(el => delete QueryObj[el]);
        this.query = this.query.find(QueryObj);
        return this;
    }

    sort()
    {
        if(this.queryObj.sort)
        {
            const sortBy = this.queryObj.sort.split(",").join(" ");
           this.query= this.query.sort(sortBy);
        }
        else
        {
            this.query=  this.query.sort("name");
        }    

        return this;
    }

    fields()
    {
        if(this.queryObj.fields)
    {
        const selectBy = this.queryObj.fields.split(",").join(" ");
        this.query=  this.query.select(selectBy);
    }
    else
    {
        this.query= this.query.select("-__v");
    }
    return this;
    }

  paidging()
  {
      
    const limits = this.queryObj.limit * 1  || 100;
    const pages = this.queryObj.page * 1 || 1; 
    const skip = (pages - 1) * limits;
    this.query= this.query.skip(skip).limit(limits);
   
    return this;
  }
}