import React, { useEffect, useState } from "react";

import './FloatingCard.css';

import {
    theme,eyesMap,eyebrowsMap,mouthsMap,hairMap,facialHairMap,clothingMap,accessoryMap,
    graphicsMap,hatMap,bodyMap,BigHead
    } from "@bigheads/core";


function selectRandomKey(object) {
    return Object.keys(object)[
        Math.floor(Math.random() * Object.keys(object).length)
    ];
}

function pickRandom(list) {
     return list[Math.floor(Math.random() * list.length)];
}

function randomNumber(min, max) { 
    return (Math.random() * (max - min) + min).toFixed(2);
} 

function getRandomOptions() {
    const skinTone = selectRandomKey(theme.colors.skin);
    const eyes = selectRandomKey(eyesMap);
    const eyebrows = selectRandomKey(eyebrowsMap);
    const mouth = selectRandomKey(mouthsMap);
    const hair = selectRandomKey(hairMap);
    const facialHair = selectRandomKey(facialHairMap);
    const clothing = selectRandomKey(clothingMap);
    const accessory = selectRandomKey(accessoryMap);
    const graphic = selectRandomKey(graphicsMap);
    const hat = selectRandomKey(hatMap);
    const body = selectRandomKey(bodyMap);

    const hairColor = selectRandomKey(theme.colors.hair);
    const clothingColor = selectRandomKey(theme.colors.clothing);
    const circleColor = selectRandomKey(theme.colors.bgColors);
    const lipColor = selectRandomKey(theme.colors.lipColors);
    const hatColor = selectRandomKey(theme.colors.clothing);
    const faceMaskColor = selectRandomKey(theme.colors.clothing);

    const mask = true;
    const faceMask = false;
    const lashes = Math.random() > 0.5;

    return {skinTone,eyes,eyebrows,mouth,hair,facialHair,clothing,accessory,graphic,
    hat,body,hairColor,clothingColor,circleColor,lipColor,hatColor,faceMaskColor,mask,
    faceMask,lashes
    };
}

const Card = ({fname,loc, show}) => {
    return <div className={show? "floating-card-active":'floating-card'}>
        <div className="img">
            <BigHead {...getRandomOptions()} />
        </div>

        <div className="font-13 semi-bold color-primary text">
            <p>{pickRandom(fname)} from {pickRandom(loc)} Qualified For</p>
            <p>$<span className="bold">{randomNumber(105, 300)}</span>/Monthly Back to S.S</p>
            <p>{Math.round(randomNumber(3, 55))} seconds ago</p>
        </div>
    </div>
}
export const FloatingCard = () => {
    const fname = ["Aaran", "Aaron", "Aaron-James", "Aarron", "Aaryan", "Aaryn", "Abdisalam", "Abdul", "Abdul-Aziz", "Abdulbasir", "Abdulkadir", "Abdulkarem", "Abdulkhader", "Abdullah", "Abdul-Majeed", "Abdulmalik", "Abdul-Rehman", "Abdur", "Abdurraheem", "Abdur-Rahman", "Abdur-Rehmaan", "Abel", "Abhinav", "Abhisumant", "Abid", "Abir", "Abraham", "Abu", "Abubakar", "Ace", "Adain", "Adam", "Adam-James", "Addison", "Addisson", "Adegbola", "Adegbolahan", "Aden", "Adenn", "Adie", "Adil", "Aditya", "Adnan", "Adrian", "Adrien", "Aedan",  "Ahmed", "Ahmed-Aziz", "Ahoua", "Aiden-Jack", "Aiden-Vee", "Aidian", "Aidy", "Ailin", "Aiman", "Ainsley", "Ainslie", "Airen", "Airidas", "Airlie", "AJ", "Ajay", "A-Jay", "Ajayraj", "Akan", "Akram", "Al", "Ala", "Alan", "Alanas", "Alasdair", "Alastair", "Alber", "Albert", "Albie", "Aldred", "Alec", "Aled", "Aleem", "Aleksandar", "Aleksander", "Aleksandr", "Aleksandrs", "Alekzander", "Alessandro", "Alessio", "Alex", "Alexander", "Alexei", "Alexx", "Alexzander", "Alf", "Alfee", "Alfie", "Alfred", "Alfy", "Alhaji", "Al-Hassan", "Ali", "Aliekber", "Alieu", "Alihaider", "Alisdair", "Alishan", "Alistair", "Alistar", "Alister", "Aliyaan", "Allan", "Allan-Laiton", "Allen", "Allesandro", "Allister", "Ally", "Alphonse", "Altyiab", "Alum", "Alvern", "Alvin", "Alyas", "Amaan", "Aman", "Amani", "Ambanimoh", "Ameer", "Amgad", "Ami", "Amin", "Amir", "Ammaar", "Ammar", "Ammer", "Amolpreet", "Amos", "Amrinder", "Amrit", "Amro", "Anay", "Andrea", "Andreas", "Andrei", "Andrejs", "Andrew", "Andy", "Anees", "Anesu", "Angel", "Angelo", "Angus", "Anir", "Anis", "Anish", "Anmolpreet", "Annan", "Anndra", "Anselm", "Anthony", "Anthony-John", "Antoine", "Anton", "Antoni", "Antonio", "Antony", "Antonyo", "Anubhav", "Aodhan", "Aon", "Aonghus", "Apisai", "Arafat", "Aran", "Arandeep", "Arann", "Aray", "Arayan", "Archibald", "Archie", "Arda", "Ardal", "Ardeshir", "Areeb", "Areez", "Aref", "Arfin", "Argyle", "Argyll", "Ari", "Aria", "Arian", "Arihant", "Aristomenis", "Aristotelis", "Arjuna", "Arlo", "Armaan", "Arman", "Armen", "Arnab", "Arnav", "Arnold", "Aron", "Aronas", "Arran", "Arrham", "Arron", "Arryn", "Arsalan", "Artem", "Arthur", "Artur", "Arturo", "Arun", "Arunas", "Arved", "Arya", "Aryan", "Aryankhan", "Aryian", "Aryn", "Asa", "Asfhan", "Ash", "Ashlee-jay", "Ashley", "Ashton", "Ashton-Lloyd", "Ashtyn", "Ashwin", "Asif", "Asim", "Aslam", "Asrar", "Ata", "Atal", "Atapattu", "Ateeq", "Athol", "Athon", "Athos-Carlos", "Atli", "Atom", "Attila", "Aulay", "Aun", "Austen", "Austin", "Avani", "Averon", "Avi", "Avinash", "Avraham", "Awais", "Awwal", "Axel", "Ayaan", "Ayan", "Aydan", "Ayden", "Aydin", "Aydon", "Ayman", "Ayomide", "Ayren", "Ayrton", "Aytug", "Ayub", "Ayyub", "Azaan", "Azedine", "Azeem", "Azim", "Aziz", "Azlan", "Azzam", "Azzedine", "Babatunmise", "Babur", "Bader", "Badr", "Badsha", "Bailee", "Bailey", "Bailie", "Bailley", "Baillie", "Baley", "Balian", "Banan", "Barath", "Barkley", "Barney", "Baron", "Barrie", "Barry", "Bartlomiej", "Bartosz", "Basher", "Basile", "Baxter", "Baye", "Bayley", "Beau", "Beinn", "Bekim", "Believe", "Ben", "Bendeguz", "Benedict", "Benjamin", "Benjamyn", "Benji", "Benn", "Bennett", "Benny", "Benoit", "Bentley", "Berkay", "Bernard", "Bertie", "Bevin", "Bezalel", "Bhaaldeen", "Bharath", "Bilal", "Bill", "Billy", "Binod", "Bjorn", "Blaike", "Blaine", "Blair", "Blaire", "Blake", "Blazej", "Blazey", "Blessing", "Blue", "Blyth", "Bo", "Boab", "Bob", "Bobby", "Bobby-Lee", "Bodhan", "Boedyn", "Bogdan", "Bohbi", "Bony", "Bowen", "Bowie", "Boyd", "Bracken", "Brad", "Bradan", "Braden", "Bradley", "Bradlie", "Bradly", "Brady", "Bradyn", "Braeden", "Braiden", "Brajan", "Brandan", "Branden", "Brandon", "Brandonlee", "Brandon-Lee", "Brandyn", "Brannan", "Brayden", "Braydon", "Braydyn", "Breandan", "Brehme", "Brendan", "Brendon", "Brendyn", "Breogan", "Bret", "Brett", "Briaddon", "Brian", "Brodi", "Brodie", "Brody", "Brogan", "Broghan", "Brooke", "Brooklin", "Brooklyn", "Bruce", "Bruin", "Bruno", "Brunon", "Bryan", "Bryce", "Bryden", "Brydon", "Brydon-Craig", "Bryn", "Brynmor", "Bryson", "Buddy", "Bully", "Burak", "Burhan", "Butali", "Butchi", "Byron", "Cabhan", "Cadan", "Cade", "Caden", "Cadon", "Cadyn", "Caedan", "Caedyn", "Cael", "Caelan", "Caelen", "Caethan", "Cahl", "Cahlum", "Cai", "Caidan", "Caiden", "Caiden-Paul", "Caidyn", "Caie", "Cailaen", "Cailean", "Caileb-John", "Cailin", "Cain", "Caine", "Cairn", "Cal", "Calan", "Calder", "Cale", "Calean", "Caleb", "Calen", "Caley", "Calib", "Calin", "Callahan", "Callan", "Callan-Adam", "Calley", "Callie", "Callin", "Callum", "Callun", "Callyn", "Calum", "Calum-James", "Calvin", "Cambell", "Camerin", "Cameron", "Campbel", "Campbell", "Camron", "Caolain", "Caolan", "Carl", "Carlo", "Carlos", "Carrich", "Carrick", "Carson", "Carter", "Carwyn", "Casey", "Casper", "Cassy", "Cathal", "Cator", "Cavan", "Cayden", "Cayden-Robert", "Cayden-Tiamo", "Ceejay", "Ceilan", "Ceiran", "Ceirin", "Ceiron", "Cejay", "Celik", "Cephas", "Cesar", "Cesare", "Chad", "Chaitanya", "Chang-Ha", "Charles", "Charley", "Charlie", "Charly", "Chase", "Che", "Chester", "Chevy", "Chi", "Chibudom", "Chidera", "Chimsom", "Chin", "Chintu", "Chiqal", "Chiron", "Chris", "Chris-Daniel", "Chrismedi", "Christian", "Christie", "Christoph", "Christopher", "Christopher-Lee", "Christy", "Chu", "Chukwuemeka", "Cian", "Ciann", "Ciar", "Ciaran", "Ciarian", "Cieran", "Cillian", "Cillin", "Cinar", "CJ", "C-Jay", "Clark", "Clarke", "Clayton", "Clement", "Clifford", "Clyde", "Cobain", "Coban", "Coben", "Cobi", "Cobie", "Coby", "Codey", "Codi", "Codie", "Cody", "Cody-Lee", "Coel", "Cohan", "Cohen", "Colby", "Cole", "Colin", "Coll", "Colm", "Colt", "Colton", "Colum", "Colvin", "Comghan", "Conal", "Conall", "Conan", "Conar", "Conghaile", "Conlan", "Conley", "Conli", "Conlin", "Conlly", "Conlon", "Conlyn", "Connal", "Connall", "Connan", "Connar", "Connel", "Connell", "Conner", "Connolly", "Connor", "Connor-David", "Conor", "Conrad", "Cooper", "Copeland", "Coray", "Corben", "Corbin", "Corey", "Corey-James", "Corey-Jay", "Cori", "Corie", "Corin", "Cormac", "Cormack", "Cormak", "Corran", "Corrie", "Cory", "Cosmo", "Coupar", "Craig", "Craig-James", "Crawford", "Creag", "Crispin", "Cristian", "Crombie", "Cruiz", "Cruz", "Cuillin", "Cullen", "Cullin", "Curtis", "Cyrus", "Daanyaal", "Daegan", "Daegyu", "Dafydd", "Dagon", "Dailey", "Daimhin", "Daithi", "Dakota", "Daksh", "Dale", "Dalong", "Dalton", "Damian", "Damien", "Damon", "Dan", "Danar", "Dane", "Danial", "Daniel", "Daniele", "Daniel-James", "Daniels"];
    var location = [ "Kane, PA", "Detroit,	MI", "Norfolk, VA", "Sturgis, MI", "Kissimmee, FL", "Dallas, TX", "Dover, DE","Hilliard, OH", "Tyler, TX", "Largo, FL", "Clinton, TN", "El Paso, TX", "Crockett, TX", "Hutchinson, KS", "Mankato, MN", "Sparks, NV", "Nashua, NH", "Milbank, SD", "Wichita, KS", "Cape Coral, FL", "Lorain, OH", "Eagle Pass, TX", "Minneapolis, MN", "Biddeford, ME", "Merced, CA", "New Orleans, LA", "Oakland, CA", "Bay City, TX", "Longview, TX", "Arkansas City, KS", "Neosho, MO", "Bells, TN", "Polson, MT", "Wasilla, AK", "Dale, TX", "Deltona, FL", "Gainesville, FL", "Oroville, CA", "Reserve, LA", "Waipahu, HI", "Norfolk, VA", "Moss Point, MS", "Washington, DC", "Staunton, VA", "Front Royal, VA", "Tampa, FL", "San Pedro, CA", "Pasadena, CA", "Hillsville, VA", "Quantico, VA", "El Campo, TX", "Harvey, LA", "West Plains, MO", "Sonora, CA", "Denver, CO", "Hamilton, MS", "New Town, ND", "Ariton, AL", "Wolford, VA", "Ballinger, TX", "Elmendorf, TX", "Topeka, KS", "Salem, OR", "Portsmouth, VA", "Saint Paul, MN", "Stockdale, TX", "Petersburg, VA", "Wylie, TX", "Houston, TX", "Eau Claire, WI", "Knoxville, TN", "Auburn, IL", "Houma, LA", "Topeka, KS", "Mitchell, SD", "Silsbee, TX", "Fort Worth, TX", "Niota, TN", "Ravenna, OH", "Porter, TX", "Katy, TX", "Chicago, IL", "Berne, IN", "Wichita, KS", "Los Angeles, CA", "Hondo, NM", "Chefornak, AK", "Akron, OH", "Victorville, CA", "Arabi, LA", "Suring, WI"];
    const [show , setShow] = useState(false);

    useEffect(()=>{
        setTimeout(()=>{
            setShow(!show);
        }, 4000)
    })

    return <div>
        {show? <Card fname={fname} loc={location} show={show} /> : ""}
    </div>
}