import input from "../utils/input";
import makeFileFromStub from "../utils/makeFileFromStub";

const createPage = async () => {
    let manipulationConf = {ssr: false, ssg: false, ssgPath: false};
    const name = await input("Select a path/name for your page: ");
    let q = await input("Do you want to import getServersideProps function? [yes/no]");
    if (q === 'yes')
        manipulationConf.ssr = true;
    else {
        q = await input("Do you want to import getStaticProps function? [yes/no]");
        if (q === 'yes') {
            manipulationConf.ssg = true;
            q = await input("Do you want to import getStaticPaths function? [yes/no]");
            if (q === 'yes')
                manipulationConf.ssgPath = true;
        }
    }
    await makeFileFromStub(name, "./pages", "/page.stub", manipulationConf,  {}, "tsx");
}

export = createPage;