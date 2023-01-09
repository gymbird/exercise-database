interface Exercise {
  id: string;
  name: string;
  description: string;
  musclesWorked: string[];
  instructions: string[];
  kind: number;
}

let [name, image_path] = Deno.args;

let id = name.replace("(", "").replace(")", "").replace(" ", "_");

Deno.run({
  cmd: ["cp", image_path, `./exercises/${id}.png`]
})

let exercisesText = await Deno.readTextFile("./index.json");

let exercises: Exercise[] = JSON.parse(exercisesText);

if(exercises.find(x => x.id === id) === undefined) {
  exercises.push({
    id,
    name,
    description: "This exercise has not yet been given a description.",
    musclesWorked: ["This exercise has not yet been specified the muscles worked."],
    instructions: ["This exercise has not yet been specified instructions."],
    kind: 0
  })
}

console.log(exercises);

await Deno.writeTextFile("./index.json", JSON.stringify(exercises, null, 1))
