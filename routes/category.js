import { createClient } from '@supabase/supabase-js';
import express from 'express';
let router = express.Router();

const supabase = createClient(
  "https://tlrdqzoceehxesqlmdkb.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRscmRxem9jZWVoeGVzcWxtZGtiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ4MTA0NTcsImV4cCI6MjA2MDM4NjQ1N30.g70J8JSJbjj0xz8tJGTk2wEQNXvAZoGCLaJQHmVjbsM"
);

/* GET home page. */
router.get('/', async (req, res, next) => {
  try {
    const { data, error } = await supabase.from('category').select('*')
    console.log("data", data);
    return res.json(data)
  } catch (error) {
    return res.send(error)
  }

});

router.get('/:id', async (req, res, next) => {
  try {
    const { data, error } = await supabase.from('category')
      .select('')
      .eq("id", parseInt(req.params.id))

    console.log("data", data);

    return res.json(data)
  } catch (error) {
    return res.send(error)
  }

});

router.get('/name/:id', async (req, res, next) => {
  try {
    const { data, error } = await supabase.from('category')
      .select('')
      .eq("id", parseInt(req.params.id))

    console.log("data", data);

    return res.json(data[0].title)
  } catch (error) {
    return res.send(error)
  }

});


// delete category

router.delete("/:id", async (request, response) => {
  try {
    const { data, error } = await supabase
      .from("category")
      .delete()
      .eq("id", request.params.id);

    const { datar, errorr } = await supabase.from("category").select();

    if (error) {
      return response.status(400).json(error);
    }
    return response.send(datar);
  } catch (error) {
    response.send({ error });
  }
});

export default router;
