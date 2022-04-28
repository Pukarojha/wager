const ContentBasedRecommender = require("content-based-recommender");
const db = require("../db");
const express = require("express");
const router = express.Router();

// recommending jobs
router.post("/job", (req, res) => {
  let { idPerson, skills } = req.body;
  const posts = [
    {
      id: `${idPerson}`,
      content: skills,
    },
  ];
  const tags = [];
  const data = [];
  let value = [];
  db.query(`select idjob as id, skills as content  from job`, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      for (let i = 0; i < result.length; i++) {
        let id = `${result[i].id}`;
        let content = `${result[i].content}`;
        tags.push({ id: id, content: content });
      }
      const tagMap = tags.reduce((acc, tag) => {
        acc[tag.id] = tag;
        return acc;
      }, {});
      const recommender = new ContentBasedRecommender();
      recommender.trainBidirectional(posts, tags);
      for (let post of posts) {
        console.log(post);
        const relatedTags = recommender.getSimilarDocuments(post.id);
        const tags = relatedTags.map((t) => tagMap[t.id].id);
        // console.log(post.content, "related tags:", tags);
        for (let j = 0; j < tags.length; j++) {
          let value = tags[j];
          data.push(parseInt(value));
        }
      }
      for (let k = 0; k < data.length; k++) {
        let idjob = data[k];
        db.query(`Select * from job where idjob=?`, [idjob], (err, output) => {
          if (err) {
            console.log(err);
          } else {
            value.push(output[0]);
            if (k === data.length - 1) {
              console.log(value);
              res.json({ data: value });
            }
          }
        });
      }
    }
  });

  //   for freelancing

  //   db.query(`select idfreelance, skill from freelance`, (err, result) => {
  //     if (err) {
  //       console.log(err);
  //     } else {
  //       tags = result;
  //       const tagMap = tags.reduce((acc, tag) => {
  //         acc[tag.id] = tag;
  //         return acc;
  //       }, {});

  //       const recommender = new ContentBasedRecommender();

  //       recommender.trainBidirectional(posts, tags);
  //       for (let post of posts) {
  //         const relatedTags = recommender.getSimilarDocuments(post.id);
  //         const tags = relatedTags.map((t) => tagMap[t.id].content);
  //         console.log(post.content, "related tags:", tags);
  //       }
  //     }
  //   });
});

//recommending freelance
router.post("/freelance", (req, res) => {
  let { idPerson, skills } = req.body;
  const posts = [
    {
      id: `${idPerson}`,
      content: skills,
    },
  ];
  const tags = [];
  const data = [];
  let value = [];
  db.query(`select idjob as id, skills as content  from job`, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      for (let i = 0; i < result.length; i++) {
        let id = `${result[i].id}`;
        let content = `${result[i].content}`;
        tags.push({ id: id, content: content });
      }
      const tagMap = tags.reduce((acc, tag) => {
        acc[tag.id] = tag;
        return acc;
      }, {});
      const recommender = new ContentBasedRecommender();
      recommender.trainBidirectional(posts, tags);
      for (let post of posts) {
        const relatedTags = recommender.getSimilarDocuments(post.id);
        const tags = relatedTags.map((t) => tagMap[t.id].id);
        // console.log(post.content, "related tags:", tags);
        for (let j = 0; j < tags.length; j++) {
          let value = tags[j];
          data.push(parseInt(value));
        }
      }
      for (let k = 0; k < data.length; k++) {
        let idfreelance = data[k];
        db.query(
          `Select * from freelance where idfreelance=?`,
          [idfreelance],
          (err, output) => {
            if (err) {
              console.log(err);
            } else {
              value.push(output[0]);
              if (k === data.length - 1) {
                // console.log(value);
                res.json({ data: value });
              }
            }
          }
        );
      }
    }
  });

  //   for freelancing

  //   db.query(`select idfreelance, skill from freelance`, (err, result) => {
  //     if (err) {
  //       console.log(err);
  //     } else {
  //       tags = result;
  //       const tagMap = tags.reduce((acc, tag) => {
  //         acc[tag.id] = tag;
  //         return acc;
  //       }, {});

  //       const recommender = new ContentBasedRecommender();

  //       recommender.trainBidirectional(posts, tags);
  //       for (let post of posts) {
  //         const relatedTags = recommender.getSimilarDocuments(post.id);
  //         const tags = relatedTags.map((t) => tagMap[t.id].content);
  //         console.log(post.content, "related tags:", tags);
  //       }
  //     }
  //   });
});

//for all person posting jobs
router.get("/alljobs", (req, res) => {
  db.query(
    `Select work.roles, work.skill, experience, description, idUser, concat(person.fName,' ',person.lname) as name ,person.photo from work join person on work.idUser= person.idPerson where work.roles='Job'`,
    // `select job.roles, skills, experience, text, job.idPerson, concat(person.fName,' ',person.lname) as name ,person.photo from job join person on job.idPerson= person.idPerson`,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.json({ result: result });
        //
      }
    }
  );
});

//for all  organization posting jobs
router.get("/allOjobs", (req, res) => {
  db.query(
    `select work.roles, work.skill, experience, description, idUser, organization.oName as name, organization.photo from work join organization on work.idUser= organization.idOrganization where work.roles='Job'`,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.json({ result: result });
      }
    }
  );
});

router.get("/allOfreelance", (req, res) => {
  db.query(
    `select work.roles, work.skill, experience, description, idUser, organization.oName as name, organization.photo from work join organization on work.idUser= organization.idOrganization where work.roles='Freelance'`,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.json({ result: result });
      }
    }
  );
});

//for all person posting freelance
router.get("/allfreelance", (req, res) => {
  db.query(
    `Select work.roles, work.skill, experience, description, idUser, person.idPerson, concat(person.fName,' ',person.lname) as name ,person.photo from work join person on work.idUser= person.idPerson where work.roles='Freelance'`,
    // `select job.roles, skills, experience, text, job.idPerson, concat(person.fName,' ',person.lname) as name ,person.photo from job join person on job.idPerson= person.idPerson`,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.json({ result: result });
        //
      }
    }
  );
});

//for all organization posting freelance
router.get("/alloFreelance", (req, res) => {
  db.query(
    `select work.roles, work.skill, experience, description, idUser, organization.oName as name, organization.photo from work join organization on work.idUser= organization.idOrganization where work.roles='Freelance'`,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.json({ result: result });
      }
    }
  );
});

//new person post recommendations
router.post("/persons", (req, res) => {
  let { idPerson, skills } = req.body;
  console.log(idPerson);
  const posts = [
    {
      id: `${idPerson}`,
      content: skills,
    },
  ];
  const tags = [];
  const data = [];
  let value = [];
  db.query(
    `select idwork as id, skill as content  from work where userType='Person' `,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        // console.log(result.length);
        for (let i = 0; i < result.length; i++) {
          let id = `${result[i].id}`;
          let content = `${result[i].content}`;
          tags.push({ id: id, content: content });
        }
        const tagMap = tags.reduce((acc, tag) => {
          acc[tag.id] = tag;
          return acc;
        }, {});
        const recommender = new ContentBasedRecommender();
        recommender.trainBidirectional(posts, tags);
        for (let post of posts) {
          // console.log(post);
          const relatedTags = recommender.getSimilarDocuments(post.id);
          const tags = relatedTags.map((t) => tagMap[t.id].id);
          // console.log(post.content, "related tags:", tags);
          for (let j = 0; j < tags.length; j++) {
            let value = tags[j];
            data.push(parseInt(value));
          }
        }
        for (let k = 0; k < data.length; k++) {
          let idjob = data[k];
          // console.log(idjob);
          db.query(
            // `Select * from work where idwork=?`,
            `Select work.idwork, roles, work.skill, experience, description, idUser, userType, concat(person.fName,' ' ,person.lname) as name, person.photo from work left join person on work.idUser= person.idPerson where work.idwork=?`,
            [idjob],
            (err, output) => {
              if (err) {
                console.log(err);
              } else {
                // console.log(output[0]);
                value.push(output[0]);
                if (k === data.length - 1) {
                  // console.log(value);
                  res.json({ data: value });
                }
              }
            }
          );
        }
      }
    }
  );
});

router.post("/personPost", (req, res) => {
  const idPerson = req.body;
  db.query(
    `Select person.idPerson, concat(person.fName, " ", person.lname) as name, person.photo, work.roles, work.skill, work.experience, work.description from person join work on person.idPerson= work.idUser and person.idPerson=?`,
    [idPerson],
    (err, res) => {
      if (err) {
        console.log(err);
      } else {
        res.send({ result: result });
      }
    }
  );
});

router.post("/organization", (req, res) => {
  let { idPerson, skills } = req.body;
  const posts = [
    {
      id: `${idPerson}`,
      content: skills,
    },
  ];
  const tags = [];
  const data = [];
  let value = [];
  db.query(
    `select idwork as id, skill as content  from work where userType='Organization' `,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        // console.log(result.length);
        for (let i = 0; i < result.length; i++) {
          let id = `${result[i].id}`;
          let content = `${result[i].content}`;
          tags.push({ id: id, content: content });
        }
        const tagMap = tags.reduce((acc, tag) => {
          acc[tag.id] = tag;
          return acc;
        }, {});
        const recommender = new ContentBasedRecommender();
        recommender.trainBidirectional(posts, tags);
        for (let post of posts) {
          // console.log(post);
          const relatedTags = recommender.getSimilarDocuments(post.id);
          const tags = relatedTags.map((t) => tagMap[t.id].id);
          // console.log(post.content, "related tags:", tags);
          for (let j = 0; j < tags.length; j++) {
            let value = tags[j];
            data.push(parseInt(value));
          }
        }
        for (let k = 0; k < data.length; k++) {
          let idjob = data[k];
          // console.log(idjob);
          db.query(
            `Select work.idwork, roles, work.skill, experience, description, idUser, userType, organization.oName as name, organization.photo from work left join organization on work.idUser= organization.idOrganization where work.idwork=?`,
            [idjob],
            (err, output) => {
              if (err) {
                console.log(err);
              } else {
                // console.log(output[0]);
                value.push(output[0]);
                if (k === data.length - 1) {
                  // console.log(value);
                  res.json({ data: value });
                }
              }
            }
          );
        }
      }
    }
  );
});

module.exports = router;
