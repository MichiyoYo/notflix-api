/**
 * @fileOverview Server application where API endpoints are defined
 * @author <a href="cristina.deelester@gmail.com">Cristina Lester</a>
 * @version 1.0.0
 * @requires express module
 */

const express = require("express"),
  morgan = require("morgan"),
  uuid = require("uuid");

const server = express();
server.use(express.json());
server.use(morgan("common"));

/**
 * The variable PORT holds the port number where the server is gonna be reacheable at
 * @constant
 */
const PORT = 8080;

/**
 * The array topMovies holds 10 top movies with their properties
 * @type {object}
 */
let topMovies = [
  {
    id: "1",
    Title: "The Departed",
    Description:
      "An undercover cop and a mole in the police attempt to identify each other while infiltrating an Irish gang in South Boston.",
    ImagePath: "theDeparted.jpg",
    Featured: true,
    Genre: {
      Name: "Crime",
      Description:
        "Crime films, in the broadest sense, is a film genre inspired by and analogous to the crime fiction literary genre. Films of this genre generally involve various aspects of crime and its detection. Stylistically, the genre may overlap and combine with many other genres, such as drama or gangster film, but also include comedy, and, in turn, is divided into many sub-genres, such as mystery, suspense or noir.",
    },
    Director: {
      Name: "Martin Scorsese",
      Bio: "Martin Charles Scorsese was born on November 17, 1942 in Queens, New York City, to Catherine Scorsese (nee Cappa) and Charles Scorsese, who both worked in Manhattan's garment district, and whose families both came from Palermo, Sicily. He was raised in the neighborhood of Little Italy which later provided the inspiration for several of his films. Scorsese earned a B.S. degree in film communications in 1964, followed by an M.A. in the same field in 1966 at New York University's School of Film. During this time, he made numerous prize-winning short films including The Big Shave (1967), and directed his first feature film, Who's That Knocking at My Door (1967).",
      Birth: "1942",
      Death: null,
    },
  },
  {
    id: "2",
    Title: "Back to the future",
    Description:
      "Marty McFly, a 17-year-old high school student, is accidentally sent thirty years into the past in a time-traveling DeLorean invented by his close friend, the eccentric scientist Doc Brown.",
    ImagePath: "backToTheFuture.jpg",
    Featured: true,
    Genre: {
      Name: "Sci-Fi",
      Description:
        'Science fiction (sometimes shortened to sci-fi or SF) is a genre of speculative fiction that typically deals with imaginative and futuristic concepts such as advanced science and technology, space exploration, time travel, parallel universes, and extraterrestrial life. It has been called the "literature of ideas", and often explores the potential consequences of scientific, social, and technological innovations.',
    },
    Director: {
      Name: "Robert Zemeckis",
      Bio: "A whiz-kid with special effects, Robert is from the Spielberg camp of film-making (Steven Spielberg produced many of his films). Usually working with writing partner Bob Gale, Robert's earlier films show he has a talent for zany comedy (Romancing the Stone (1984), 1941 (1979)) and special effect vehicles (Who Framed Roger Rabbit (1988) and Back to the Future (1985)). His later films have become more serious, with the hugely successful Tom Hanks vehicle Forrest Gump (1994) and the Jodie Foster film Contact (1997), both critically acclaimed movies. Again, these films incorporate stunning effects. Robert has proved he can work a serious story around great effects.",
      Birth: "1951",
      Death: null,
    },
  },
  {
    id: "3",
    Title: "Total Recall",
    Description:
      "When a man goes in to have virtual vacation memories of the planet Mars implanted in his mind, an unexpected and harrowing series of events forces him to go to the planet for real - or is he?",
    ImagePath: "totalRecall.jpg",
    Featured: false,
    Genre: {
      Name: "Sci-Fi",
      Description:
        'Science fiction (sometimes shortened to sci-fi or SF) is a genre of speculative fiction that typically deals with imaginative and futuristic concepts such as advanced science and technology, space exploration, time travel, parallel universes, and extraterrestrial life. It has been called the "literature of ideas", and often explores the potential consequences of scientific, social, and technological innovations.',
    },
    Director: {
      Name: "Paul Verhoeven",
      Bio: "Paul Verhoeven graduated from the University of Leiden, with a degree in math and physics. He entered the Royal Netherlands Navy, where he began his film career by making documentaries for the Navy and later for TV. In 1969, he directed the popular Dutch TV series, Floris (1969), about a medieval knight. This featured actor Rutger Hauer, who has appeared in many of Verhoeven's later films. Verhoeven's first feature, Any Special Way (1971), was released in 1971. However, it was his second, Turkish Delight (1973), with its combination of raw sexuality and a poignant story-line, that gained him great popularity in the Netherlands, especially with male audiences. When his films, especially Soldier of Orange (1977) and The 4th Man (1983), received international recognition, Verhoeven moved to the US. His first US film was Flesh+Blood (1985) in 1985, but it was RoboCop (1987) and, especially, Total Recall (1990) that made him a big box office success. Sometimes accused of portraying excessive violence in his films, Verhoeven replies that he is only recording the violence of society. Verhoeven has co-scripted two of his films: Soldier of Orange (1977) and Flesh+Blood (1985). He also directed an episode of the HBO The Hitchhiker (1983) TV series. Several of his films have been photographed by Jost Vacano, including the hit cult film, Starship Troopers (1997), starring Casper Van Dien.",
      Birth: "1951",
      Death: null,
    },
  },
  {
    id: "4",
    Title: "Indiana Jones and the Raiders of the Lost Ark",
    Description:
      "In 1936, archaeologist and adventurer Indiana Jones is hired by the U.S. government to find the Ark of the Covenant before Adolf Hitler's Nazis can obtain its awesome powers.",
    ImagePath: "indianaJones.jpg",
    Featured: false,
    Genre: {
      Name: "Adventure",
      Description:
        "An adventure film is form of adventure fiction, and is a genre of film. Subgenres of adventure films include swashbuckler films, pirate films, and survival films. Adventure films may also be combined with other film genres such as action, animation, comedy, drama, fantasy, science fiction, family, horror, or war.",
    },
    Director: {
      Name: "Steven Spielberg",
      Bio: "Steven Allan Spielberg was born in 1946 in Cincinnati, Ohio, to Leah Frances (Posner), a concert pianist and restaurateur, and Arnold Spielberg, an electrical engineer who worked in computer development. His parents were both born to Russian Jewish immigrant families. Steven spent his younger years in Haddon Township, New Jersey, Phoenix, Arizona, and later Saratoga, California. He went to California State University Long Beach, but dropped out to pursue his entertainment career.",
      Birth: "1946",
      Death: null,
    },
  },
  {
    id: "5",
    Title: "Parasite",
    Description:
      "Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.",
    ImagePath: "parasite.jpg",
    Featured: true,
    Genre: {
      Name: "Drama",
      Description:
        "In film and television, drama is a category of narrative fiction (or semi-fiction) intended to be more serious than humorous in tone.[1] Drama of this kind is usually qualified with additional terms that specify its particular super-genre, macro-genre, or micro-genre,[2] such as soap opera (operatic drama), police crime drama, political drama, legal drama, historical drama, domestic drama, teen drama, and comedy-drama (dramedy). These terms tend to indicate a particular setting or subject-matter, or else they qualify the otherwise serious tone of a drama with elements that encourage a broader range of moods.",
    },
    Director: {
      Name: "Bong Joon Ho",
      Bio: "Bong Joon Ho was born on September 14, 1969 in Daegu, South Korea. He is a writer and producer, known for Snowpiercer (2013), Okja (2017) and Parasite (2019).",
      Birth: "1969",
      Death: null,
    },
  },
];

let genres = [
  {
    Name: "Drama",
    Description:
      "In film and television, drama is a category of narrative fiction (or semi-fiction) intended to be more serious than humorous in tone.[1] Drama of this kind is usually qualified with additional terms that specify its particular super-genre, macro-genre, or micro-genre,[2] such as soap opera (operatic drama), police crime drama, political drama, legal drama, historical drama, domestic drama, teen drama, and comedy-drama (dramedy). These terms tend to indicate a particular setting or subject-matter, or else they qualify the otherwise serious tone of a drama with elements that encourage a broader range of moods.",
  },
  {
    Name: "Adventure",
    Description:
      "An adventure film is form of adventure fiction, and is a genre of film. Subgenres of adventure films include swashbuckler films, pirate films, and survival films. Adventure films may also be combined with other film genres such as action, animation, comedy, drama, fantasy, science fiction, family, horror, or war.",
  },
  {
    Name: "Sci-Fi",
    Description:
      'Science fiction (sometimes shortened to sci-fi or SF) is a genre of speculative fiction that typically deals with imaginative and futuristic concepts such as advanced science and technology, space exploration, time travel, parallel universes, and extraterrestrial life. It has been called the "literature of ideas", and often explores the potential consequences of scientific, social, and technological innovations.',
  },
  {
    Name: "Crime",
    Description:
      "Crime films, in the broadest sense, is a film genre inspired by and analogous to the crime fiction literary genre. Films of this genre generally involve various aspects of crime and its detection. Stylistically, the genre may overlap and combine with many other genres, such as drama or gangster film, but also include comedy, and, in turn, is divided into many sub-genres, such as mystery, suspense or noir.",
  },
];

let users = [
  {
    Username: "creelester",
    Password: "badpassword123",
    Email: "creelester@email.com",
    Birthday: "1988-04-14T07:00:00.000Z",
    FavoriteMovies: ["1"],
    id: "1",
  },
];

/**
 * The docs static files are stored in the subdirectory docs under public
 */
server.use("/docs", express.static("public/docs"));

/**
 * Main endpoint to reach the home page of NotFlix
 */
server.get("/", (req, res) => {
  let responseText =
    "<h1>Welcome to NotFlix! 🍿</h1><h2>Not your mother's movie DB.</h2>";
  res.status(200).send(responseText);
});

// Fetching entry points

/**
 * This endpoint fetches a list of all movies and returns it to the user
 */
server.get("/movies", (req, res) => {
  res.status(200).json(topMovies);
});

server.get("/movies/:title", (req, res) => {
  const { title } = req.params;
  let movieToFind = topMovies.find((film) => film.Title.includes(title));
  if (movieToFind) {
    return res.status(200).json(movieToFind);
  } else {
    return res
      .status(404)
      .send(`We don't have that movie, sorry about that! 😿`);
  }
});

server.get("/genres/:genre", (req, res) => {
  const { genre } = req.params;
  let genretoFind = genres.find((gen) => gen.Name === genre);
  if (genretoFind) {
    return res.status(200).json(genretoFind);
  } else {
    return res.status(404).send(`I couldn't find that genre, sorry. ☹️`);
  }
});

server.get("/users", (req, res) => {
  res.status(200).json(users);
});

//Adding records

server.post("/register", (req, res) => {
  let newUser = req.body;
  if (
    !newUser.hasOwnProperty("Username") ||
    !newUser.hasOwnProperty("Password")
  ) {
    return res.status(400).send(
      `
        Username and Password are required.
        Please provide them in the format 
        {
            "Username": yourUserName, 
            "Password": yourPassword
        }
        `
    );
  } else {
    newUser.id = uuid.v4();
    users.push(newUser);
    return res.status(201).send(newUser);
  }
});

//Updating records

server.put("/users/:id/:infoToUpdate/:newValue", (req, res) => {
  const { id, infoToUpdate, newValue } = req.params;
  console.log(id, infoToUpdate, newValue);
  let usrToUpdate = users.find((urs) => urs.id == id);
  if (usrToUpdate) {
    if (!usrToUpdate.hasOwnProperty(infoToUpdate)) {
      return res
        .status(404)
        .send(
          `Not Found: The user with id ${id} doesn't have a property called ${infoToUpdate} 🙅`
        );
    } else {
      switch (infoToUpdate) {
        case "Username":
          usrToUpdate.Username = newValue;
          break;
        case "Password":
          usrToUpdate.Password = newValue;
          break;
        case "Email":
          usrToUpdate.Email = newValue;
          break;
        default:
          return res
            .status(403)
            .send(`Operation Forbidden: ⛔ You cannot update this value. ⛔`);
      }
      console.log(usrToUpdate);
      return res.status(201).json(usrToUpdate);
    }
  } else {
    return res
      .status(404)
      .send(`Not Found: The user with id ${id} doesn't exist. 🙅 `);
  }
});

//deleting records

server.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Error 500: Something went wrong 😿");
});

server.listen(PORT, () => {
  console.log("Server running on port 8080 🤙 ");
});
