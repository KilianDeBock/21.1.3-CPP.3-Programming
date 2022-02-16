const BASE_URL = "https://we-are-pgm.herokuapp.com";

function WeArePgmApi() {
  this.getStudents = async () => {
    try {
      const response = await fetch(`${BASE_URL}/student`);
      return response.json();
    } catch (error) {
      console.log("Error occurred", error);
    }
  };

  this.addStudent = async ({
    firstname,
    lastname,
    nickname,
    classname,
    email,
    age,
    avatar,
    hobbies,
    motto,
    about,
  }) => {
    const missingData = !(
      typeof firstname === "string" &&
      typeof lastname === "string" &&
      typeof nickname === "string" &&
      typeof classname === "string" &&
      typeof email === "string" &&
      typeof age === "number" &&
      typeof avatar === "string" &&
      Array.isArray(hobbies) &&
      typeof motto === "string" &&
      typeof about === "string"
    );
    console.log("addStudent: Correct and needed data exists:", !missingData);
    if (missingData) throw new Error("Missing data");
    const student = {
      firstnamefirstname,
      lastname,
      nickname,
      classname,
      email,
      age,
      avatar,
      hobbies,
      motto,
      about,
    };
    console.log("addStudent: The new student", student);
    // const response = await fetch(`${BASE_URL}/student`, {
    //   method: 'POST',
    //   mode: 'cors',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(student),
    // });
    //
    // return await response.json();
  };
}
