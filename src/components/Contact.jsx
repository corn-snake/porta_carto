export function Contact(){
    function putPost(id, dir) {
        id.preventDefault();
        document.getElementById(id);
    }
    return (<>Contactform
        <form id="contactForm" action={putPost()} method="put"></form>
    </>);
}