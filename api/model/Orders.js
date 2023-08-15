const db = require ('../config')
class Orders{
    fetchOrders(req,res){
        const query =`
        SELECT o.orderID,o.orderDate, b.bookTitle, b.category, b.bookUrl
        FROM orders o
        LEFT JOIN books b
        USING (bookID)
        UNION
        SELECT CONCAT(a.authorName,'',a.authorSurname) 'Author'
        FROM BookAuhor a
        LEFT JOIN orders o
        USING (id);
        `
        db.query(query,(err,results)=>{
            if(err) throw err
            res.json({
                status:res.statusCode,
                results
            })
        })
    }
    fetchOrder(req,res){
        const query =`
        SELECT o.orderID,o.orderDate, b.bookTitle, b.category, b.bookUrl
        FROM orders o
        LEFT JOIN books b
        USING (bookID)
        WHERE o.orderID = ${req.params.id}
        UNION
        SELECT CONCAT(a.authorName,'',a.authorSurname) 'Author'
        FROM BookAuhor a
        LEFT JOIN orders o
        USING (id)
        WHERE o.orderID = ${req.params.id};
        `
        db.query(query,(err,results)=>{
            if(err) throw err
            res.json({
                status:res.statusCode,
                results
            })
        })
    }
    updateOrder(req,res){
        const query =`
        UPDATE books
        SET ?
        WHERE bookID = ${req.params.id};
        `
        db.query(query,[req.body],(err)=>{
            if (err) throw err
            res.json({
                status:res.statusCode,
                msg:"This book has been updated"
            })
        })
    }
    deleteOrder(req,res){
        const query =`
        DELETE FROM books
        WHERE bookID = ${req.params.id};
        `
      db.query(query,(err)=>{
        if(err) throw err
        res.json({
            status:res.statusCode,
            msg:"This book has been deleted."
        })
      })
    }
    addOrder(req,res){
        const data =req.body
        const query =`
        INSERT INTO books
        SET ? 
        `
        db.query(query,[data],(err)=>{
            if(err) throw err
            res.json({
                status:res.statusCode,
                msg:"This book has been added."
            })
        })
    }
}
module.exports =Orders;