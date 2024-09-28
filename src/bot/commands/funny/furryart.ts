import { CommandInteraction, EmbedBuilder, SlashCommandBuilder } from 'discord.js';

const tags = [
    "fluffy",
    "cuddle",
    "sleeping",
    "anthro",
    "couple",
    "feral",
    "snuggle",
    "paws",
    "puppy",
    "whiskers",
    "love",
    "friends",
    "playful",
    "kiss",
    "hugging",
    "nuzzle",
    "boop"
];


function getRandomTag(): string {
    const randomIndex = Math.floor(Math.random() * tags.length);
    return tags[randomIndex];
}

const url = "https://e926.net/posts.json?tags="; //e926 is sfw 

export const data = new SlashCommandBuilder()
    .setName('furry')
    .setDescription('Sends a randomly selected SFW artwork of furries!')
    .addBooleanOption(option => 
        option.setName('straight')
            .setDescription('Should art be straight only or not?')
            .setRequired(false));

export const execute = async (interaction: CommandInteraction) => {
    await interaction.deferReply(); 

    const straightOption = interaction.options.getBoolean('straight');
    console.log(straightOption)

    const post = await fetchData(straightOption);
    if (post == null) {
        await interaction.editReply({ content: "Could not find any art, try again!" });
        return;
    }

    const embed = new EmbedBuilder()
    .setAuthor({ name: post.tags.artist[0], url: post.sources[0] })
    .setImage(post.file.url)

    await interaction.editReply({
        embeds: [embed]
    });
};

async function fetchData(straight: any): Promise<any | null> {
    try {
        var tag = getRandomTag();
        console.log(tag);
        const response = await fetch(url + (straight ? "" : "gay ") + tag, {
            method: 'GET',
            headers: {
                'User-Agent': 'SkittyBetty' 
            }
        });

        if (!response.ok) throw new Error(`HTTP error! Status ${response.status}`);

        const data = await response.json();

        if (data.posts && data.posts.length > 0) {
            const randomIndex = Math.floor(Math.random() * data.posts.length);
            const randomPost = data.posts[randomIndex];

            return randomPost;
        }
        return null;
    } catch (error) {
        console.error('Error fetching data:', error)
        return null;
    }
}