<?php
require_once 'config/razorpay.php';
?>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>GRIND AI - Enrollment</title>
<link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Syne:wght@400;500;600;700;800&display=swap" rel="stylesheet">

<style>
:root{
--bg:#050505;
--card:#0D0D0D;
--accent:#FF8C32;
--text:#F4F1EA;
--muted:#8D8D8D;
--border:rgba(255,255,255,.08);
}
*{margin:0;padding:0;box-sizing:border-box}
body{
background:var(--bg);
color:var(--text);
font-family:'Syne',sans-serif;
}
.container{max-width:1400px;margin:auto;padding:0 30px;}
.header{
height:110px;
border-bottom:1px solid var(--border);
display:flex;
align-items:center;
}
.logo{
font-family:'Bebas Neue',sans-serif;
font-size:4rem;
letter-spacing:2px;
}
.logo span{color:var(--accent);}
.steps{
display:flex;
justify-content:center;
gap:40px;
padding:30px 0;
color:var(--muted);
font-size:.9rem;
letter-spacing:2px;
}
.hero{
padding:70px 0;
border-bottom:1px solid var(--border);
}
.label{
color:var(--accent);
letter-spacing:3px;
margin-bottom:20px;
}
.hero h1{
font-family:'Bebas Neue',sans-serif;
font-size:clamp(4rem,10vw,8rem);
line-height:.9;
max-width:900px;
}
.hero p{
margin-top:25px;
max-width:700px;
color:var(--muted);
font-size:1.1rem;
line-height:1.8;
}
.section{padding:70px 0;}
.section-title{
font-family:'Bebas Neue',sans-serif;
font-size:3rem;
margin-bottom:30px;
}
.cards{
display:grid;
grid-template-columns:repeat(auto-fit,minmax(320px,1fr));
gap:24px;
}
.card{
background:var(--card);
border:1px solid var(--border);
padding:35px;
}
.featured{
border:2px solid var(--accent);
transform:scale(1.02);
}
.plan-label{
color:var(--accent);
font-size:.85rem;
letter-spacing:2px;
margin-bottom:10px;
}
.plan{
font-family:'Bebas Neue',sans-serif;
font-size:2.5rem;
}
.price{
font-size:3rem;
font-weight:800;
margin:15px 0;
}
.desc{
color:var(--muted);
margin-bottom:20px;
}
ul{padding-left:20px;}
li{margin-bottom:10px;color:#ddd;}
.btn{
display:block;
margin-top:25px;
text-align:center;
background:var(--accent);
color:#000;
padding:15px;
font-weight:700;
text-decoration:none;
}
.timeline{
display:grid;
grid-template-columns:repeat(auto-fit,minmax(180px,1fr));
gap:20px;
}
.stepbox{
background:var(--card);
border:1px solid var(--border);
padding:25px;
}
.stepnum{
color:var(--accent);
font-size:2rem;
font-weight:700;
}
.payment{
display:grid;
grid-template-columns:1fr 1fr;
gap:30px;
}
.box{
background:var(--card);
border:1px solid var(--border);
padding:30px;
}
.qr{
height:260px;
border:2px dashed var(--border);
display:flex;
align-items:center;
justify-content:center;
color:var(--muted);
margin-top:20px;
}
.disclaimer{
color:var(--muted);
font-size:.9rem;
line-height:1.8;
margin-top:30px;
}
.footer{
padding:40px 0;
border-top:1px solid var(--border);
text-align:center;
color:var(--muted);
}

.social-follow{
display:flex;
justify-content:center;
align-items:center;
gap:10px;
margin-bottom:15px;
font-size:.95rem;
flex-wrap:wrap;
text-align:center;
}

.social-follow a{
color:var(--accent);
text-decoration:none;
font-weight:700;
}

.social-follow svg{
width:22px;
height:22px;
fill:var(--accent);
}

.orange-divider{
height:2px;
background:var(--accent);
margin-bottom:40px;
}

.addon-grid{
display:grid;
grid-template-columns:repeat(auto-fit,minmax(300px,1fr));
gap:24px;
margin-top:30px;
}

.addon-card{
background:var(--card);
border:1px solid var(--border);
padding:30px;
}

.addon-price{
font-size:2rem;
font-weight:800;
margin:15px 0;
color:var(--accent);
}

@media(max-width:768px){
.payment{grid-template-columns:1fr;}
}
</style>
</head>
<body>

<div class="container">

<div class="header">
<div class="logo">GRIND<span>.</span></div>
</div>

<div class="steps">
<div><span style="color:#22C55E;">✓</span> 01 INTAKE</div>
<div><span style="color:#22C55E;">✓</span> 02 ASSESSMENT</div>
<div><span style="color:#22C55E;">✓</span> 03 PROGRAMME</div>
<div style="color:#fff;">04 ENROLLMENT</div>
</div>

<div class="hero">
<div class="label">STEP 04 — ENROLLMENT</div>
<h1>YOUR PERSONALIZED PROGRAMME IS READY</h1>
<p>
Based on your assessment, we have prepared a personalized fitness roadmap aligned to your goals, lifestyle and experience level.
</p>

<p style="
margin-top:20px;
font-size:1.2rem;
font-weight:700;
color:var(--accent);
line-height:1.6;
">
Complete your enrollment to unlock your plan and receive your private programme link.
</p>
</div>




<div class="section">
    
    <div class="box" style="margin-bottom:30px;">

<h3>Your Details</h3>

<br>

<input
type="text"
id="customerName"
placeholder="Full Name"
style="width:100%;padding:15px;margin-bottom:15px;">

<input
type="email"
id="customerEmail"
placeholder="Email Address"
style="width:100%;padding:15px;margin-bottom:15px;">

<input
type="tel"
id="customerPhone"
placeholder="Phone Number"
style="width:100%;padding:15px;">

<div id="customerError" style="display:none; color:#ff6b6b; margin-top:10px; font-size:.9rem;">
</div>

</div>
    
 <div style="margin-bottom:30px; padding:15px; background:#0D0D0D; border:1px solid rgba(255,255,255,.08);">

<label style="display:flex; align-items:flex-start; gap:12px; line-height:1.6; cursor:pointer;">

<input
type="checkbox"
id="termsAccepted"
style="margin-top:5px; transform:scale(1.2);">

<span>

I have read and agree to the <a href="#terms" style="color:#FF8C32;
font-weight:700; text-decoration:none;">Terms & Conditions</a> of GRIND AI.

</span>

</label>

</div>   
    
    <div class="box" style="margin-bottom:40px;">

<h3>Have a Referral Code?</h3>

<br>

<input
type="text"
id="affiliateCode"
oninput="couponChanged()"
placeholder="Enter Code"
style="
width:100%;
padding:15px;
background:#111;
border:1px solid rgba(255,255,255,.1);
color:white;
">

<br><br>

<button
onclick="validateAffiliate()"
class="btn"
style="border:none;cursor:pointer;"
>
APPLY CODE
</button>

<div id="affiliateMessage" style="margin-top:15px;"></div>

</div>
    
<div class="section-title">CHOOSE YOUR TRANSFORMATION PATH</div>

<div class="cards">

<div class="card">
<div class="plan">3 MONTH KICKSTART</div>
<div class="price" id="price3m">₹3499</div>
<div class="desc">Build momentum and establish consistency.</div>
<ul>
<li>Goal Focused Workout Programme</li>
<li>AI Generated Nutrition Guidance</li>
<li>Workout & Weight Tracking</li>
<li>Access for 4 Months</li>
</ul>
<a href="#" class="btn" onclick="startPayment('3 MONTH KICKSTART',3499); return false;">ENROLL NOW</a>
</div>

<div class="card featured">
<div class="plan-label">MOST RECOMMENDED</div>
<div class="plan">6 MONTH TRANSFORMATION</div>
<div class="price" id="price6m">₹7,999</div>
<div class="desc">Designed for sustainable transformation.</div>
<ul>
<li>Everything in Kickstart</li>
<li>Lifestyle Consultation</li>
<li>Workout Programme + 1 Variant</li>
<li>Priority Programme Review</li>
<li>Access for 8 Months</li>
</ul>
<a href="#" class="btn" onclick="startPayment('6 MONTH TRANSFORMATION',7999); return false;">START TRANSFORMATION</a>
</div>

<div class="card">
<div class="plan">12 MONTH LIFESTYLE EVOLUTION</div>
<div class="price" id="price12m">₹12,999</div>
<div class="desc">For long-term lifestyle change.</div>
<ul>
<li>Everything in Transformation</li>
<li>2 Lifestyle Consultations</li>
<li>Workout Programme + 3 Variants</li>
<li>Annual Transformation Roadmap</li>
<li>Access for 15 Months</li>
</ul>
<a href="#" class="btn" onclick="startPayment('12 MONTH LIFESTYLE EVOLUTION', 12999); return false;">COMMIT FOR A YEAR</a>
</div>

</div>
</div>

<div class="section">
<div class="section-title">WHAT HAPPENS NEXT?</div>
<div class="timeline">
<div class="stepbox"><div class="stepnum">01</div>Complete Intake Form</div>
<div class="stepbox"><div class="stepnum">02</div>AI Assessment Generated</div>
<div class="stepbox"><div class="stepnum">03</div>Expert Review</div>
<div class="stepbox"><div class="stepnum">04</div>Programme Finalized</div>
<div class="stepbox"><div class="stepnum">05</div>Plan Delivered via Email</div>
<div class="stepbox"><div class="stepnum">06</div>Start Training</div>
</div>
</div>

<div class="section">

<div class="orange-divider"></div>

<div class="section-title">
EXPERT SERVICES
</div>

<p style="
color:var(--muted);
max-width:800px;
line-height:1.8;
margin-bottom:25px;
">
Access expert services delivered by experienced coaches and certified professionals to provide deeper personalization and support throughout your fitness journey. These services can be booked independently or alongside your GRIND membership.
</p>

<div class="addon-grid">

<div class="addon-card">
<h3>Lifestyle Consultation</h3>

<div class="addon-price">
₹1,599
</div>

<p>
Personalized guidance on nutrition habits, lifestyle optimization,
fitness plateaus and sustainable transformation planning.
</p>
<br>
<p style="color:var(--accent);font-size:.9rem;">
Included free in 6 Month Transformation and 12 Month Lifestyle Evolution plans.
</p>

<a href="#" class="btn" onclick="startPayment('Lifestyle Consultation',1599); return false;">BOOK CONSULTATION</a>


</div>

<div class="addon-card">

<h3>Personalized Nutrition Programme</h3>

<div class="addon-price">
₹4,999
</div>

<p>
Receive a comprehensive nutrition assessment from a
<strong style="color:var(--accent);font-size:.9rem;">Certified & Experienced Functional Nutritionist</strong>,
including blood report review, medical history evaluation and a
personalized nutrition plan designed around your health and fitness goals.
</p>


<br>

<p style="color:var(--accent);font-size:.9rem;">
Ideal for individuals managing PCOS, Diabetes, Thyroid Disorders, High Cholesterol, Fatty Liver, Digestive Health and other medical or lifestyle conditions.
</p>

<a href="#"
class="btn"
onclick="startPayment('Personalized Nutrition Programme',4999); return false;">
BOOK NUTRITION PROGRAMME
</a>

</div>

<div class="addon-card">

<h3>Additional Workout Variant</h3>

<div class="addon-price">
₹599
</div>

<p>
Unlock an additional workout variant beyond those included in your programme.
</p>
<br>
<p>Ideal when you want greater exercise variety, need a change in training style, or are ready for a new challenge.</p>

<a href="#"
class="btn"
onclick="startPayment('Workout Refresh',499); return false;">
PURCHASE VARIANT
</a>

</div>

</div>

<div class="disclaimer">
AI-generated nutrition guidance included with all GRIND memberships is intended for educational purposes only. Personalized Nutrition Programmes are delivered by a Certified Functional Nutritionist. Individuals with medical conditions should continue consulting their healthcare professional before making significant dietary or lifestyle changes.
</div>

</div>


<div class="section" id="terms">
<div class="section-title">
TERMS & CONDITIONS
</div>

<div class="box">

<ul>

<li>
All programme purchases are non-refundable once access has been granted.
</li>

<li>
GRIND AI provides fitness and lifestyle guidance for educational and informational purposes only.
</li>

<li>
Results vary based on consistency, effort, nutrition adherence, recovery, genetics and individual circumstances.
</li>

<li>
Workout programmes should be performed responsibly and within your physical capabilities.
</li>

<li>
Individuals with injuries, medical conditions, pregnancy or other health concerns should seek professional medical advice before beginning any programme.
</li>

<li>
Lifestyle Consultations and Workout Refreshes are chargeable services unless specifically included within your selected plan.
</li>

<li>
Programme access remains active only for the duration specified in the selected subscription.
</li>

<li>
GRIND AI reserves the right to improve, modify or update programme features and platform functionality at any time.
</li>

<li>
By enrolling, you acknowledge and accept these terms and participate at your own discretion and responsibility.
</li>

</ul>

</div>

</div>

</div>

<div class="footer">

<div style="margin-bottom:20px;">

<div class="social-follow">

<a href="https://instagram.com/grindfit.ai" target="_blank">

<svg viewBox="0 0 24 24">
<path d="M7.75 2C4.574 2 2 4.574 2 7.75v8.5C2 19.426 4.574 22 7.75 22h8.5C19.426 22 22 19.426 22 16.25v-8.5C22 4.574 19.426 2 16.25 2h-8.5zm0 2h8.5A3.75 3.75 0 0 1 20 7.75v8.5A3.75 3.75 0 0 1 16.25 20h-8.5A3.75 3.75 0 0 1 4 16.25v-8.5A3.75 3.75 0 0 1 7.75 4zm8.75 1a1.25 1.25 0 1 0 0 2.5A1.25 1.25 0 0 0 16.5 5zM12 6.5A5.5 5.5 0 1 0 12 17.5A5.5 5.5 0 0 0 12 6.5zm0 2A3.5 3.5 0 1 1 12 15.5A3.5 3.5 0 0 1 12 8.5z"/>
</svg>

Follow @grindfit.ai

</a>

</div>

</div>

<div style="margin-bottom:15px;">
Need support? Contact us at
<a href="mailto:support.grindfit.ai@trenddma.com" style="color:var(--accent);">
support.grindfit.ai@trenddma.com
</a>
</div>

GRIND AI • POWERED BY TREND

</div>

</div>

<script>

const originalPrices = {
    price3m: 3499,
    price6m: 7999,
    price12m: 12999
};

let currentDiscount = 0;

function validateAffiliate(){

const code =
document.getElementById('affiliateCode')
.value
.trim();

if(code === ''){

alert('Please enter a referral code.');

return;

}

fetch('/GRIND/api/validate_affiliate.php',{

method:'POST',

headers:{
'Content-Type':
'application/x-www-form-urlencoded'
},

body:'code='+encodeURIComponent(code)

})

.then(response=>response.json())

.then(data=>{

const msg =
document.getElementById('affiliateMessage');

if(data.success){

msg.style.color='#4CAF50';

msg.style.fontWeight='700';

msg.innerHTML =
'🎉 Referral Code Applied! '+ data.discount +'% OFF unlocked on all plans.';

applyDiscount(data.discount);

document.getElementById('affiliateCode')
.dataset.applied = data.code;

}else{

msg.innerHTML =
'❌ Coupon is invalid or has expired';

}

});

}

function applyDiscount(discount){
    
    currentDiscount = discount;

    Object.keys(originalPrices).forEach(id => {

        let original = originalPrices[id];

        let discounted =
        Math.round(original * (100-discount)/100);

        document.getElementById(id).innerHTML =
        '<span style="text-decoration:line-through;color:#888;font-size:1.5rem;">₹'
        + original.toLocaleString()
        + '</span><br>' +
        '<span style="color:#fff;">₹'
        + discounted.toLocaleString()
        + '</span>';

    });

}

function resetPrices(){
    
    currentDiscount = 0;

    document.getElementById('price3m').innerHTML =
    '₹' + originalPrices.price3m.toLocaleString();

    document.getElementById('price6m').innerHTML =
    '₹' + originalPrices.price6m.toLocaleString();

    document.getElementById('price12m').innerHTML =
    '₹' + originalPrices.price12m.toLocaleString();

}

function couponChanged(){

    let input =
    document.getElementById('affiliateCode');

    let value =
    input.value.trim();

    let appliedCode =
    input.dataset.applied || '';

    if(value === ''){

        resetPrices();

        input.dataset.applied='';

        document.getElementById(
            'affiliateMessage'
        ).innerHTML='';

        return;

    }

    if(
        appliedCode !== '' &&
        value !== appliedCode
    ){

        resetPrices();

        input.dataset.applied='';

        document.getElementById(
            'affiliateMessage'
        ).innerHTML='';

    }

}

function showValidationModal(message){

    document.getElementById(
        'modalMessage'
    ).innerHTML = message;

    document.getElementById(
        'validationModal'
    ).style.display='flex';

}

function closeValidationModal(){

    document.getElementById(
        'validationModal'
    ).style.display='none';

    document.getElementById(
        'customerName'
    ).scrollIntoView({
        behavior:'smooth',
        block:'center'
    });

}

function validateCustomerDetails(){

    let name =
    document.getElementById(
        'customerName'
    ).value.trim();

    let email =
    document.getElementById(
        'customerEmail'
    ).value.trim();

    let phone =
    document.getElementById(
        'customerPhone'
    ).value.trim();

    let missing=[];

    if(name===''){
        missing.push('Full Name');
    }

    if(email===''){
        missing.push('Email Address');
    }

    if(phone===''){
        missing.push('Phone Number');
    }

    if(missing.length){

        showValidationModal(
            'Please complete the following before continuing:<br><br>• '
            + missing.join('<br>• ')
        );

        return false;
    }

    if(
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/
        .test(email)
    ){

        showValidationModal(
            'Please enter a valid Email Address.'
        );

        return false;
    }

    if(phone.length < 10){

        showValidationModal(
            'Please enter a valid Phone Number.'
        );

        return false;
    }

    return true;

}

function validateTerms(){

    if(
        !validateCustomerDetails()
    ){
        return false;
    }

    if(
        !document.getElementById(
            'termsAccepted'
        ).checked
    ){

        alert(
            'Please accept the Terms & Conditions before continuing.'
        );

        return false;
    }

    return true;

}

async function startPayment(plan,price){

console.log('PLAN=', plan);
console.log('ORIGINAL PRICE=', price);
//console.log('DISCOUNT=', currentDiscount);

    if(!validateTerms()){
        return;
    }

    let coupon='';
    
    let actualPrice = price;

const appliedCode =
document.getElementById('affiliateCode')
.dataset.applied || '';

if(appliedCode !== ''){

    const msg =
    document.getElementById('affiliateMessage')
    .innerHTML;

    const match =
    msg.match(/(\d+)%/);

    if(match){

        const discount =
        parseInt(match[1]);

        actualPrice =
        Math.round(
            price * (100-discount)/100
        );

    }

}

    const couponInput =
    document.getElementById(
        'affiliateCode'
    );

    if(couponInput){
        coupon = couponInput.value.trim();
    }

    const formData =
    new URLSearchParams();

    formData.append(
    'plan',
    plan
);

formData.append(
    'price',
    price
);

formData.append(
    'coupon',
    coupon
);

    const response =
    await fetch('Payment/create_order.php',
        {
            method:'POST',
            body:formData
        }
    );

    const data =
    await response.json();

    if(!data.success){

        alert(
            'Unable to create payment.'
        );

        return;
    }

    const options = {

        key:
        '<?php echo RAZORPAY_KEY_ID; ?>',

        amount:
        data.amount,

        currency:'INR',

        name:'GRIND AI',

        description:plan,

        order_id:
        data.order_id,

        handler:function(response){

            verifyPayment(
                response,
                plan,
                price,
                data.final_price,
                data.discount_percent,
                coupon
            );

        },

        prefill:{

            name:
            document.getElementById(
                'customerName'
            ).value,

            email:
            document.getElementById(
                'customerEmail'
            ).value,

            contact:
            document.getElementById(
                'customerPhone'
            ).value
        }

    };

    const rzp =
    new Razorpay(options);

    rzp.open();

}

async function verifyPayment(
    payment,
    plan,
    originalPrice,
    finalPrice,
    discountPercent,
    coupon
){

    const formData =
    new URLSearchParams();

    formData.append(
        'razorpay_payment_id',
        payment.razorpay_payment_id
    );

    formData.append(
        'razorpay_order_id',
        payment.razorpay_order_id
    );

    formData.append(
        'razorpay_signature',
        payment.razorpay_signature
    );

    formData.append(
        'name',
        document.getElementById(
            'customerName'
        ).value
    );

    formData.append(
        'email',
        document.getElementById(
            'customerEmail'
        ).value
    );

    formData.append(
        'phone',
        document.getElementById(
            'customerPhone'
        ).value
    );

    formData.append('plan',plan);
    formData.append('original_price',originalPrice);
    formData.append('final_price',finalPrice);
    formData.append('discount_percent',discountPercent);
    formData.append('coupon_code',coupon);

    const response =
    await fetch('Payment/verify_payment.php',
        {
            method:'POST',
            body:formData
        }
    );

    const data =
    await response.json();

    if(data.success){

        window.location =
        'payment-success.php';

    }else{

        alert(
            'Payment verification failed.'
        );

    }

}


</script>

<div
id="validationModal"
style="
display:none;
position:fixed;
top:0;
left:0;
width:100%;
height:100%;
background:rgba(0,0,0,.8);
z-index:9999;
justify-content:center;
align-items:center;
">

<div
style="
background:#0D0D0D;
border:1px solid #FF8C32;
padding:30px;
max-width:500px;
width:90%;
text-align:center;
">

<h2 style="color:#FF8C32;margin-bottom:20px;">
⚠ Complete Your Details
</h2>

<p
id="modalMessage"
style="
line-height:1.8;
margin-bottom:25px;
">
</p>

<button
onclick="closeValidationModal()"
class="btn"
style="
border:none;
cursor:pointer;
margin-top:0;
">
OK
</button>

</div>

</div>

<script src="https://checkout.razorpay.com/v1/checkout.js"></script>

</body>
</html>
