<?php /* GRIND Landing Page */ ?>

<!DOCTYPE html>

<html lang="en">

<head>

<meta charset="UTF-8">

<meta name="viewport" content="width=device-width, initial-scale=1.0">

<title>GRIND - Fitness Reimagined</title>

<link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500;700&display=swap" rel="stylesheet">

<style>

:root{--o:#f47920;--b:#0b0b0b;--c:#171717;--w:#f5f5f0;}

*{box-sizing:border-box;margin:0;padding:0}



img{

max-width:100%;

height:auto;

display:block;

}



body{

background:var(--b);

color:var(--w);

font-family:'DM Sans',sans-serif;

overflow-x:hidden;

}



html{

overflow-x:hidden;

}

.container{max-width:1280px;margin:auto;padding:0 24px}

h1,h2,h3{font-family:'Bebas Neue',sans-serif;letter-spacing:1px}

header{position:sticky;top:0;background:#090909;border-bottom:1px solid #222;z-index:10}

.nav{display:flex;justify-content:space-between;align-items:center;padding:24px 0}

.nav-links{
    display:flex;
    gap:35px;
    align-items:center;
}

.nav-links a{
    color:#fff;
    text-decoration:none;
    font-weight:600;
    transition:.3s;
}

.nav-links a:hover{
    color:#f47920;
}

.logo{font-family:'Bebas Neue';font-size:64px}.logo span{color:var(--o)}

.btn{background:var(--o);color:#fff;text-decoration:none;padding:16px 28px;border-radius:4px;font-weight:700}

.hero{min-height:90vh;background:linear-gradient(rgba(0,0,0,.55),rgba(0,0,0,.75)),url('hero-bg.jpg') center/cover no-repeat;display:flex;align-items:center;text-align:center}

.hero h1{

font-size:110px;

line-height:.9;

word-break:break-word;

}

.hero p{max-width:850px;margin:25px auto;font-size:22px}

.section{padding:90px 0}

.title{font-size:72px;text-align:center;margin-bottom:20px}

.cards{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:24px}

.card{background:var(--c);padding:30px;border:1px solid #262626;border-radius:10px;text-align:center}

.timeline{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:20px}

.step{background:var(--c);padding:25px;border-radius:10px}

.shots{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}



.dashboard-card{

    background:#171717;

    border:1px solid rgba(255,255,255,.08);

    border-radius:12px;

    overflow:hidden;

}



.dashboard-card img{

    width:100%;

    height:320px;

    object-fit:cover;

    object-position:left top;

    display:block;

}



.dashboard-card h3{

    padding:20px 20px 10px;

    font-size:28px;

    color:#f5f5f0;

}



.dashboard-card p{

    padding:0 20px 20px;

    color:rgba(255,255,255,.75);

    line-height:1.7;

}



.vision{

display:grid;

grid-template-columns:.95fr 1.05fr;

gap:70px;

align-items:center

}

.imgph{height:380px;background:#222}



.vision-image{

    height:550px;

    overflow:hidden;

    border-radius:12px;

    border:1px solid rgba(255,255,255,.08);

}



.vision-image img{

    width:100%;

    height:100%;

    object-fit:cover;

    display:block;

}



.problem-image{

    height:540px;

    overflow:hidden;

    border-radius:10px;

    border:1px solid rgba(255,255,255,.08);

}



.problem-image img{

    width:100%;

    height:100%;

    object-fit:cover;

    display:block;

}

.cta{

background:linear-gradient(90deg,#f47920,#ff8f3a);

padding:60px 20px;

text-align:center;

overflow:hidden;

}



.cta-title{

font-size:72px;

line-height:.95;

word-break:break-word;

}



footer{

padding:70px 20px 40px;

text-align:center;

border-top:1px solid rgba(255,255,255,.08);

background:#080808;

}



.footer-logo{

font-family:'Bebas Neue';

font-size:72px;

letter-spacing:2px;

margin-bottom:10px;

}



.footer-logo span{

color:#f47920;

}



.footer-tagline{

font-size:18px;

color:rgba(255,255,255,.65);

margin-bottom:25px;

}



.footer-contact{

display:flex;

justify-content:center;

align-items:center;

gap:15px;

flex-wrap:wrap;

margin-bottom:25px;

}



.footer-contact a{

color:#fff;

text-decoration:none;

transition:.3s;

}



.footer-contact a:hover{

color:#f47920;

}



.footer-divider{

width:180px;

height:1px;

background:rgba(255,255,255,.15);

margin:0 auto 25px;

}



.footer-copyright{

font-size:14px;

color:rgba(255,255,255,.45);

}



@media(max-width:768px){



html,

body{

overflow-x:hidden;

}



.container{

padding:0 20px;

}



.nav{

flex-direction:column;

gap:20px;

}

.nav-links{
    flex-direction:column;
    gap:15px;
}

.logo{

font-size:48px;

}



.btn{

width:100%;

max-width:300px;

text-align:center;

}



.hero{

min-height:auto;

padding:80px 0;

}



.hero h1{

font-size:48px;

line-height:.95;

}



.hero p{

font-size:18px;

}



.title{

font-size:42px;

line-height:.95;

}



.cta-title{

font-size:42px;

line-height:.95;

}



.vision{

grid-template-columns:1fr;

gap:30px;

}



.shots{

grid-template-columns:1fr;

}



.cards{

grid-template-columns:1fr;

}



.timeline{

grid-template-columns:1fr;

}



.dashboard-card img{

height:220px;

}



.problem-image{

height:320px;

}



.vision-image{

height:320px;

}



.footer-logo{

font-size:54px;

}



.footer-tagline{

font-size:16px;

}



.footer-contact{

flex-direction:column;

gap:8px;

}



.footer-contact span{

display:none;

}

/* ==========================
   CONTACT SECTION FIX
========================== */

.contact-grid{
    grid-template-columns:1fr !important;
}

.contact-grid a{
    border-right:none !important;
    border-bottom:1px solid rgba(255,255,255,.08);
}

.contact-grid a:last-child{
    border-bottom:none;
}

.contact-title{
    font-size:46px !important;
}

.contact-content{
    padding:40px 25px 30px !important;
}

.contact-description{
    font-size:17px !important;
    line-height:1.8 !important;
}

.contact-value{
    font-size:18px !important;
    word-break:break-word;
    overflow-wrap:anywhere;
}

}




.trust-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:20px;margin-top:30px}
.check-grid{display:grid;grid-template-columns:1fr 1fr;gap:30px}
.panel{background:#171717;border:1px solid rgba(255,255,255,.08);border-radius:12px;padding:35px}
.faq details{background:#171717;border:1px solid rgba(255,255,255,.08);padding:20px;border-radius:10px;margin-bottom:15px}
.faq summary{cursor:pointer;font-weight:700;font-size:20px}
@media(max-width:768px){.trust-grid,.check-grid{grid-template-columns:1fr}}

</style>

</head>

<body>

<header>

<div class="container nav">

    <div class="logo">GRIND<span>.</span></div>

    <div class="nav-links">
        <a href="#about">ABOUT</a>
        <a href="membership-guide.php">MEMBERSHIP GUIDE</a>
    </div>

    <a class="btn" href="start-your-journey.php">
        START YOUR JOURNEY
    </a>

</div>

</header>



<section class="hero">

<div class="container">

<h1>FITNESS ISN'T ABOUT MOTIVATION.<br>IT'S ABOUT HAVING A PLAN.</h1>

<p>Most people don't fail because they lack discipline. They fail because they're following random workouts, generic diets and advice that wasn't built for them.</p>

<a class="btn" href="start-your-journey.php">START MY JOURNEY</a>

</div>

</section>




<section class="section">

<div class="container vision">

<div>

<div style="color:#f47920;margin-bottom:10px">THE PROBLEM</div>

<h2 style="

font-size:72px;

line-height:.95;

margin-bottom:30px;

">

WHY MOST FITNESS PLANS FAIL

</h2>

<ul style="margin-top:20px;line-height:2">

<li>People download random workout plans</li>

<li>Watch random YouTube videos</li>

<li>Try extreme diets</li>

<li>Train inconsistently</li>

<li>Then wonder why nothing changes</li>

</ul>



<p style="

margin-top:35px;

font-size:22px;

color:#F47920;

font-weight:700;

">

Fitness shouldn't feel confusing.

</p>



<p style="

font-size:18px;

line-height:1.8;

max-width:500px;

">

You need a structured system that tells you exactly what to do, when to do it, and how to progress.

</p>



</div>

<div class="problem-image">

    <img

        src="assets/problem-section.jpg"

        alt="Why Most Fitness Plans Fail"

    >

</div>

</div>

</section>



<section class="section" id="about">

<div class="container">

<div style="text-align:center;color:#f47920">WHAT IS GRIND</div>

<h2 class="title">BUILT AROUND YOU. NOT AROUND TEMPLATES.</h2>

<div class="cards">

<div class="card"><h3 style="color:#f47920">AI ASSESSMENT</h3><p>Analyze goals, fitness level, lifestyle and preferences.</p></div>

<div class="card"><h3 style="color:#f47920">PERSONALIZED PROGRAM</h3><p>Workout and nutrition designed specifically for you.</p></div>

<div class="card"><h3 style="color:#f47920">HUMAN REVIEWED</h3><p>Every programme reviewed before delivery.</p></div>

</div>

</div>

</section>
<section class="section">
<div class="container">
<div style="text-align:center;color:#f47920">WHY PEOPLE TRUST GRIND</div>
<h2 class="title">AI DOESN'T REPLACE EXPERTS.<br>IT MAKES THEM MORE EFFECTIVE.</h2>
<div class="panel">
<p style="font-size:18px;line-height:1.8">At GRIND, AI does the heavy lifting by analyzing your goals, fitness level and lifestyle to create a personalized plan. Before you ever receive it, every workout and nutrition plan is reviewed by an experienced fitness coach to ensure it is practical, balanced and aligned with your goals.</p>
<div class="trust-grid">
<div class="card">✔ Personalized—not template based</div>
<div class="card">✔ Coach reviewed before delivery</div>
<div class="card">✔ Built around your schedule and equipment</div>
<div class="card">✔ Designed to evolve as you progress</div>
</div></div></div></section>

<section class="section">

<div class="container">

<div style="text-align:center;color:#f47920">
HOW GRIND WORKS
</div>

<h2 class="title">
YOUR FITNESS JOURNEY IN FIVE SIMPLE STEPS
</h2>

<p style="
max-width:850px;
margin:0 auto 50px;
text-align:center;
font-size:20px;
line-height:1.8;
color:rgba(255,255,255,.75);
">

From your assessment to your personalized dashboard,
every workout and nutrition plan is AI-generated,
professionally reviewed, and delivered securely to you.

</p>

<a href="assets/how-grind-works.jpg" target="_blank">

<img
src="assets/how-grind-works.jpg"
alt="How GRIND Works"
style="
width:100%;
border-radius:14px;
border:1px solid rgba(255,255,255,.08);
box-shadow:0 25px 60px rgba(0,0,0,.35);
">

</a>

</div>

</section>





<section class="section">

<div class="container">

<div style="text-align:center;color:#f47920">YOUR PERSONAL FITNESS PORTAL</div>

<h2 class="title">Everything you need to follow.<br> your personalized fitness journey.</h2>

<div class="shots">

<div class="dashboard-card">



    <img

        src="assets/workout-dashboard.jpg"

        alt="Workout Dashboard"

    >



    <h3>Workout Tracking</h3>



    <p>

        Follow your personalized workout plan,

        exercise instructions and daily schedule.

    </p>



</div>

<div class="dashboard-card">



    <img

        src="assets/diet-dashboard.jpg"

        alt="Diet Dashboard"

    >



    <h3>Nutrition Guidance</h3>



    <p>

        Personalized nutrition recommendations

        aligned to your goals and lifestyle.

    </p>



</div>

<div class="dashboard-card">



    <img

        src="assets/progress-dashboard.jpg"

        alt="Progress Dashboard"

    >



    <h3>Progress Tracking</h3>



    <p>

        Track consistency, workout completion,

        calories burned and training progress.

    </p>



</div>

</div>

</div>

</section>


<section class="section"><div class="container">
<div style="text-align:center;color:#f47920">KEEP TRACK OF YOUR JOURNEY</div>
<h2 class="title">Your dashboard helps you monitor</h2>
<div class="panel">
<p>✔ Workout consistency<br><br>✔ Body weight<br><br>✔ Body measurements<br><br>✔ Training progress</p>
<p style="margin-top:20px;color:#f47920">Every few weeks you'll be invited to update your progress and stay accountable throughout your journey.</p>
</div></div></section>



<section class="section">

<div class="container">

<div style="text-align:center;color:#f47920">WHAT YOU RECEIVE</div>

<h2 class="title">A COMPLETE FITNESS ECOSYSTEM</h2>

<div class="check-grid">
<div class="panel"><h3 style="margin-bottom:20px;color:#f47920">Everything Included</h3>
<p>Personalized workout plan<br><br>Personalized default nutrition guidance<br><br>Coach-reviewed program<br><br>Exercise demonstration videos<br><br>Progress dashboard<br></p></div>
<div class="panel"><h3 style="margin-bottom:20px;color:#f47920">Not Included</h3>
<p>One-on-one personal training<br><br> Weekly live coaching<br><br>Exercise form review<br><br>Daily accountability coaching<br><br><br><em>These may become premium add-ons in the future.</em></p></div>
</div>
</div>

</section>



<section class="section">

<div class="container vision">

<div class="vision-image">

    <img

        src="assets/vision-image.jpg"

        alt="GRIND Vision"

    >

</div>

<div>

<div style="color:#f47920">OUR VISION</div>

<h2 style="font-size:70px">MAKING PERSONALIZED FITNESS ACCESSIBLE TO ALL</h2>

<p>Not everyone needs a celebrity trainer. Not everyone needs expensive coaching. Everyone deserves a plan designed specifically for them.</p>

</div>

</div>

</section>


<section class="section">
<div class="container">
<div style="max-width:900px;margin:0 auto;background:#171717;border:1px solid rgba(255,255,255,.08);border-radius:12px;padding:60px 40px;text-align:center;">
<div style="color:#f47920;letter-spacing:2px;margin-bottom:12px;">BEFORE YOU DECIDE</div>
<h2 class="title" style="margin-bottom:20px;">EXPLORE OUR MEMBERSHIP GUIDE</h2>
<p style="max-width:700px;margin:0 auto 30px;color:rgba(255,255,255,.75);font-size:18px;line-height:1.8;">
Every fitness journey is unique. Explore our membership plans, understand the features and support included, and discover how GRIND can personalize your transformation.
</p>
<a class="btn" href="membership-guide.php">VIEW MEMBERSHIP GUIDE</a>
</div>
</div>
</section>


<section class="section"><div class="container faq">
<div style="text-align:center;color:#f47920">FAQ</div>
<h2 class="title">YOUR QUESTIONS, ANSWERED</h2>
<details><summary>Is GRIND completely online?</summary><p>Yes. Everything happens virtually.</p></details>
<details><summary>Who creates my workout?</summary><p>AI generates your personalized plan and an experienced coach reviews it before delivery.</p></details>
<details><summary>Is my diet personalized?</summary><p>You receive personalized nutrition guidance. One-on-one nutrition consultation is available separately.</p></details>
<details><summary>Will someone check my exercise form?</summary><p>Exercises include detailed demonstration videos and guidance.</p></details>
<details><summary>Do I get weekly coaching?</summary><p>No. GRIND is an AI-powered coaching platform rather than a traditional weekly personal training service.</p></details>
<details><summary>Can my plan change later?</summary><p>Future updates will allow recommendations based on your progress.</p></details>
</div></section>





<section class="cta">


<h2 class="cta-title">READY TO START YOUR TRANSFORMATION?</h2>

<p>Get your personalized fitness assessment today.</p><br>

<a class="btn" style="background:#111" href="start-your-journey.php">START MY JOURNEY</a>

</section>


<section class="section">
    <div class="container">

        <div style="
            max-width:1000px;
            margin:0 auto;
            background:#171717;
            border:1px solid rgba(255,255,255,.08);
            border-radius:14px;
            overflow:hidden;
        ">

            <div class="contact-content"
     style="padding:60px 60px 40px;text-align:center;">

                <div style="
                    color:#f47920;
                    letter-spacing:2px;
                    font-size:15px;
                    margin-bottom:15px;
                    text-transform:uppercase;
                ">
                    NEED HELP DECIDING?
                </div>

                <h2 class="title contact-title" style="
                    font-size:64px;
                    margin-bottom:25px;
                ">
                    LET'S TALK
                </h2>

                <p class="contact-description" style="
                    max-width:720px;
                    margin:0 auto;
                    color:rgba(255,255,255,.75);
                    font-size:19px;
                    line-height:1.9;
                ">
                    Whether you're unsure which membership is right for you,
                    have questions about nutrition, or simply want to understand
                    how GRIND works. We're happy to help.
                </p>

            </div>


            <div class="contact-grid"
     style="
display:grid;
grid-template-columns:1fr 1fr;
                border-top:1px solid rgba(255,255,255,.08);
            ">

                <a href="mailto:support.grindfit.ai@trenddma.com"
                   style="
                        padding:35px;
                        text-align:center;
                        text-decoration:none;
                        color:#fff;
                        border-right:1px solid rgba(255,255,255,.08);
                        transition:.3s;
                   "
                   onmouseover="this.style.background='#1d1d1d'"
                   onmouseout="this.style.background='transparent'">

                    <div style="
                        color:#f47920;
                        font-size:14px;
                        letter-spacing:1px;
                        margin-bottom:12px;
                        text-transform:uppercase;
                    ">
                        EMAIL
                    </div>

                    <div class="contact-value" style="
                        font-size:24px;
                        font-weight:700;
                    ">
                        support@grindfit.ai
                    </div>

                </a>


                <a href="https://instagram.com/grindfit.ai"
                   target="_blank"
                   style="
                        padding:35px;
                        text-align:center;
                        text-decoration:none;
                        color:#fff;
                        transition:.3s;
                   "
                   onmouseover="this.style.background='#1d1d1d'"
                   onmouseout="this.style.background='transparent'">

                    <div style="
                        color:#f47920;
                        font-size:14px;
                        letter-spacing:1px;
                        margin-bottom:12px;
                        text-transform:uppercase;
                    ">
                        INSTAGRAM
                    </div>

                    <div class="contact-value" style="
                        font-size:24px;
                        font-weight:700;
                    ">
                        @grindfit.ai
                    </div>

                </a>

            </div>

        </div>

    </div>
</section>



<footer>



<div class="footer-logo">

GRIND<span>.</span>

</div>



<p class="footer-tagline">

Making Personalized Fitness Accessible To All

</p>







<div class="footer-divider"></div>



<p class="footer-copyright">

© 2026 GRIND. All rights reserved.

</p>



</footer>

</body>

</html>