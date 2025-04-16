import { createClient } from '@supabase/supabase-js';
import express from 'express';
var router = express.Router();

/* GET users listing. */
const supabase = createClient(
  "https://tlrdqzoceehxesqlmdkb.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRscmRxem9jZWVoeGVzcWxtZGtiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ4MTA0NTcsImV4cCI6MjA2MDM4NjQ1N30.g70J8JSJbjj0xz8tJGTk2wEQNXvAZoGCLaJQHmVjbsM"
);

/* GET home page. */
router.get('/', async (req, res, next) => {
  try {
    const { data, error } = await supabase.from('recipe').select('*')

    return res.json(data)
  } catch (error) {
    return res.send(error)
  }

});

router.post('/', async (req, res, next) => {
  try {
    const { data, error } = await supabase.from("recipe").insert(req.body);
    if (error) {
      return res.status(400).json(error);
    }
    res.status(200).json(req.body);
  } catch (error) {
    res.send({ error });
  }
})

// PUT /recipe/:id
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, category, ingredients } = req.body;

    const { data, error } = await supabase
      .from("recipe")
      .update({ name, category, ingredients })
      .eq('id', id);

    if (error) return res.status(400).json(error);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Server error during update' });
  }
});



// delete recipe

router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  const { error } = await supabase
    .from('recipe')
    .delete()
    .eq('id', id);

  if (error) return res.status(400).json({ error });

  res.status(200).json({ message: `Recipe ${id} deleted` });
});



export default router;
