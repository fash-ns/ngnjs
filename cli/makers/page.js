const input = require("../input");
const createFile = require("../createFile");

const createPage = async () => {
    const name = await input("Select a path/name for your page: ");
    let pageStub = ["./stubs/page.stub"];
    let q = await input("Do you want to import getServersideProps function? [yes/no]");
    if (q === 'yes')
        pageStub.push("./stubs/page/ssr.stub");
    else {
        q = await input("Do you want to import getStaticProps function? [yes/no]");
        if (q === 'yes') {
            pageStub.push("./stubs/page/ssg.stub")
            q = await input("Do you want to import getStaticPaths function? [yes/no]");
            if (q === 'yes')
                pageStub.push("./stubs/page/ssg-paths.stub")
        }
    }
    await createFile(name, "./pages", pageStub, "tsx");
}

module.exports = createPage;