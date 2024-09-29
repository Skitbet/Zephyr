import { CommandInteraction, EmbedBuilder, SlashCommandBuilder, TextChannel } from 'discord.js';

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

const sfw_url = "https://e926.net/posts.json?tags="; //e926 is sfw 
const nsfw_url = "https://e621.net/posts.json?tags="; //e621 is nsfw 

export const data = new SlashCommandBuilder()
    .setName('furry')
    .setDescription('Sends a randomly selected SFW artwork of furries!')
    .addBooleanOption(option => 
        option.setName('straight')
            .setDescription('Should art be straight only or not?')
            .setRequired(false))
    .addBooleanOption(option => 
        option.setName('nsfw')
            .setDescription('Should art be nsfw or not?')
            .setRequired(false));

export const execute = async (interaction: CommandInteraction) => {
    await interaction.deferReply(); 

    const straightOption = interaction.options.getBoolean('straight');
    const nsfwOption = interaction.options.getBoolean('nsfw');

    if (nsfwOption && !((interaction.channel as TextChannel).nsfw)) {
        await interaction.editReply({ content: "You may only use NSFW in a NSFW channel."})
        return;
    } 

    const post = await fetchData(nsfwOption, straightOption);
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

async function fetchData(nsfw: boolean, straight: boolean): Promise<any | null> {
    try {
        var tag = getRandomTag();
        const response = await fetch((nsfw ? nsfw_url : sfw_url) + (straight ? "straight" : "gay ") + tag, {
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