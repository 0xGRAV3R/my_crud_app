// solana.js

import { Connection, PublicKey, clusterApiUrl } from '@solana/web3.js';
import { Program, Provider, web3 } from '@project-serum/anchor';
import idl from './idl.json'; // Generated IDL file

const programID = new PublicKey(idl.metadata.address);
const network = clusterApiUrl('devnet');
const opts = {
    preflightCommitment: 'processed'
};

const getProvider = () => {
    const connection = new Connection(network, opts.preflightCommitment);
    const provider = new Provider(connection, window.solana, opts.preflightCommitment);
    return provider;
};

const createItem = async (data) => {
    const provider = getProvider();
    const program = new Program(idl, programID, provider);

    const [item] = await web3.PublicKey.findProgramAddress(
        [Buffer.from('item'), provider.wallet.publicKey.toBuffer()],
        program.programId
    );

    await program.rpc.createItem(data, {
        accounts: {
            item,
            user: provider.wallet.publicKey,
            systemProgram: web3.SystemProgram.programId,
        },
        signers: [],
    });
};

const updateItem = async (itemPubkey, data) => {
    const provider = getProvider();
    const program = new Program(idl, programID, provider);

    await program.rpc.updateItem(data, {
        accounts: {
            item: itemPubkey,
        },
    });
};

const deleteItem = async (itemPubkey) => {
    const provider = getProvider();
    const program = new Program(idl, programID, provider);

    await program.rpc.deleteItem({
        accounts: {
            item: itemPubkey,
            user: provider.wallet.publicKey,
        },
    });
};

export { createItem, updateItem, deleteItem };
