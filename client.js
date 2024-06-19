const anchor = require('@project-serum/anchor');
const { SystemProgram } = anchor.web3;

const main = async () => {
    const provider = anchor.AnchorProvider.env();
    anchor.setProvider(provider);

    const program = anchor.workspace.MyCrudApp;

    const data = "Hello, Solana!";

    const item = anchor.web3.Keypair.generate();

    // Create Item
    await program.rpc.createItem(data, {
        accounts: {
            item: item.publicKey,
            user: provider.wallet.publicKey,
            systemProgram: SystemProgram.programId,
        },
        signers: [item],
    });

    console.log(`Item created: ${item.publicKey.toString()}`);

    // Fetch Item
    let account = await program.account.item.fetch(item.publicKey);
    console.log('Item data:', account.data);

    // Update Item
    const newData = "Hello, Solana Updated!";
    await program.rpc.updateItem(newData, {
        accounts: {
            item: item.publicKey,
        },
    });

    // Fetch Item
    account = await program.account.item.fetch(item.publicKey);
    console.log('Updated item data:', account.data);

    // Delete Item
    await program.rpc.deleteItem({
        accounts: {
            item: item.publicKey,
            user: provider.wallet.publicKey,
        },
    });

    console.log('Item deleted');
};

main().then(() => console.log('Success')).catch((err) => console.error(err));
